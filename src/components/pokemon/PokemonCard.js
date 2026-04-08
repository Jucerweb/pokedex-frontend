import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { TypeBadge } from '@/components/ui/TypeBadge';
function PokemonCard({ pokemon, className }) {
    const dexNumber = `#${String(pokemon.id).padStart(3, '0')}`;
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return (_jsxs("div", { "data-slot": "pokemon-card", className: cn('flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md', className), children: [_jsx("img", { src: pokemon.imageUrl, alt: name, className: "size-24 object-contain" }), _jsx("span", { className: "text-xs text-muted-foreground", children: dexNumber }), _jsx("span", { className: "text-sm font-semibold", children: name }), _jsx("div", { className: "flex flex-wrap justify-center gap-1", children: pokemon.types.map((type) => (_jsx(TypeBadge, { type: type }, type))) })] }));
}
export { PokemonCard };
