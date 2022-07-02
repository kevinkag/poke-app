import { configureStore } from "@reduxjs/toolkit";
import itemPokemonSlice from "./Slices/itemPokemonSlice";
import pokedexSlice from "./Slices/pokedexSlice";
import pokemonSlice from "./Slices/pokemonSlice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice,
        pokedex: pokedexSlice,
        itemPokemon: itemPokemonSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { ignoredPaths: ['some.nested.path'] },
        serializableCheck: { ignoredPaths: ['some.nested.path'] }
    })
})