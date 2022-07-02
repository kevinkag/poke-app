import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchAllPokemons } from "../../utils/actions"
import { createArrayFromObject } from "../../utils/functions"

const initialState = {
    list: [],
    cache: [],
    mode: 'list',
    fieldSearch: '',
    status: 'idle',
    error: null,
    pagination: [0, 7],
    namesPokemon: [],
    power: false
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            if (state.cache.length === 0) {
                state.cache = state.list
            }
            const PokemonList = state.list
            const FilterPokemon = PokemonList.filter((item) => item.name.includes(action.payload))
            state.list = FilterPokemon
        },
        setPagination: (state, action) => {
            if (action.payload === 'reset') {
                state.pagination = [0, 7]
                return
            }
            let { 0: init, 1: lat } = state.pagination

            if (action.payload === 'sum') {
                if (state.list.length <= lat) {
                    return
                }
                state.pagination = [init + 7, lat + 7]
            } else if (action.payload === 'res') {
                if (init === 0) {
                    return
                }
                state.pagination = [init - 7, lat - 7]
            }
        },
        setListFromCache: (state, action) => {
            state.list = action.payload
        },
        setPower: (state, action) => {
            state.power = !action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.list = action.payload
                state.namesPokemon = createArrayFromObject(action.payload)
            })
            .addCase(fetchPokemonsAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchPokemonsAsync.rejected, (state, action) => {
                if (state.status === 'pending') {
                    state.status = 'idle'
                    state.error = action.error
                }
            })
    }
})

export const fetchPokemonsAsync = createAsyncThunk(
    'pokemon/fetchPokemonsAsync',
    async () => {
        const response = await fetchAllPokemons()
        return response.results
    }
)

export const { setSearch, setPagination, setListFromCache, setPower } = pokemonSlice.actions

export const pokemonsList = (state) => state.pokemon.list
export const pagination = (state) => state.pokemon.pagination
export const cache = (state) => state.pokemon.cache
export const fieldSearch = (state) => state.pokemon.fieldSearch
export const power = (state) => state.pokemon.power
export const mode = (state) => state.pokemon.mode
export const namesPokemon = (state) => state.pokemon.namesPokemon

export default pokemonSlice.reducer