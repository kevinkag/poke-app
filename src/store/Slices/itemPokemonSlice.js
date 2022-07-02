import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPokemonById } from '../../utils/actions'

const initialState = {
    item: {},
    status: 'idle',
    error: null,
    saved: [],
}

export const itemPokemonSlice = createSlice({
    name: 'itemPokemon',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.item = action.payload
            })
            .addCase(fetchPokemonByIdAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchPokemonByIdAsync.rejected, (state, action) => {
                if (state.status === 'pending') {
                    state.status = 'idle'
                    state.error = action.error
                }
            })
    }
})

export const fetchPokemonByIdAsync = createAsyncThunk(
    'itemPokemon/fetchPokemonByIdAsync',
    async (id) => {
        const response = fetchPokemonById(id)
        return response
    }
)

export const itemPokemon = (state) => state.itemPokemon.item
export const status = (state) => state.itemPokemon.status


export default itemPokemonSlice.reducer