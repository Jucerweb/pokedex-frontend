import { jsx as _jsx } from "react/jsx-runtime";
import { usePokemonList } from '@/hooks';
import { PokemonCard } from './PokemonCard';
function PokemonList({ generation, limit, offset }) {
    const { pokemon, loading, error } = usePokemonList({ generation, limit, offset });
    if (loading) {
        return _jsx("p", { className: "text-center text-muted-foreground", children: "Loading..." });
    }
    if (error) {
        return _jsx("p", { className: "text-center text-destructive", children: error });
    }
    return (_jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", children: pokemon.map((p) => (_jsx(PokemonCard, { pokemon: p }, p.id))) }));
}
export { PokemonList };
