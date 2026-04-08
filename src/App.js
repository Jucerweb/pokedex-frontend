import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PokemonList } from '@/components/pokemon/PokemonList';
export function App() {
    return (_jsxs("div", { className: "mx-auto max-w-5xl px-4 py-8", children: [_jsx("header", { className: "mb-8", children: _jsx("h1", { className: "text-3xl font-bold", children: "Pokedex" }) }), _jsx(PokemonList, {})] }));
}
