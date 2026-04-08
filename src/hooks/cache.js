const cache = new Map();
export function getCached(key) {
    return cache.get(key);
}
export function setCache(key, value) {
    cache.set(key, value);
}
