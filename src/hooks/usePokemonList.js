import { useState, useEffect } from 'react';
import { GENERATION_RANGES } from '@/types/pokemon';
import { getCached, setCache } from './cache';
const BASE_URL = 'https://pokeapi.co/api/v2';
function extractIdFromUrl(url) {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
}
function buildSpriteUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
export function usePokemonList(options = {}) {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const { generation, limit = 20, offset = 0 } = options;
    useEffect(() => {
        const controller = new AbortController();
        async function fetchList() {
            setLoading(true);
            setError(null);
            try {
                let fetchLimit = limit;
                let fetchOffset = offset;
                if (generation !== undefined) {
                    const range = GENERATION_RANGES[generation];
                    if (!range) {
                        setError(`Unknown generation: ${generation}`);
                        setLoading(false);
                        return;
                    }
                    const [start, end] = range;
                    fetchOffset = start - 1;
                    fetchLimit = end - start + 1;
                }
                const url = `${BASE_URL}/pokemon?limit=${fetchLimit}&offset=${fetchOffset}`;
                const cached = getCached(url);
                let data;
                if (cached) {
                    data = cached;
                }
                else {
                    const res = await fetch(url, { signal: controller.signal });
                    if (!res.ok)
                        throw new Error(`Failed to fetch Pokemon list: ${res.status}`);
                    data = await res.json();
                    setCache(url, data);
                }
                const summaryList = await Promise.all(data.results.map(async (entry) => {
                    const id = extractIdFromUrl(entry.url);
                    const detailUrl = `${BASE_URL}/pokemon/${id}`;
                    const cachedDetail = getCached(detailUrl);
                    let types;
                    if (cachedDetail) {
                        types = cachedDetail.types.map((t) => t.type.name);
                    }
                    else {
                        const detailRes = await fetch(detailUrl, { signal: controller.signal });
                        if (!detailRes.ok)
                            return { id, name: entry.name, imageUrl: buildSpriteUrl(id), types: [] };
                        const detailData = await detailRes.json();
                        setCache(detailUrl, detailData);
                        types = detailData.types.map((t) => t.type.name);
                    }
                    return {
                        id,
                        name: entry.name,
                        imageUrl: buildSpriteUrl(id),
                        types,
                    };
                }));
                if (!controller.signal.aborted) {
                    setPokemon(summaryList);
                    setTotal(data.count);
                }
            }
            catch (err) {
                if (controller.signal.aborted)
                    return;
                setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon list');
            }
            finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        fetchList();
        return () => controller.abort();
    }, [generation, limit, offset]);
    return { pokemon, loading, error, total };
}
