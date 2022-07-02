import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    screen: ['list', ''],
    current: 0,
    power: false,
    info: false,
}

export const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        setScreen: (state, action) => {
            state.screen = action.payload
        },
        setPower: (state, action) => {
            if (state.power === false) {
                state.screen = ['list', '']
            }
            state.power = !action.payload
        },
        setInfo: (state, action) => {
            state.info = !action.payload
        },
        setCurrentCard: (state, action) => {
            if (action.payload === 'sum') {
                state.current = state.current + 1
            } else if (action.payload === 'res') {
                state.current = state.current - 1
            } else {
                state.current = action.payload
            }
        }
    }
})

export const { setScreen, setPower, setInfo, setCurrentCard } = pokedexSlice.actions

export const screen = (state) => state.pokedex.screen
export const power = (state) => state.pokedex.power
export const info = (state) => state.pokedex.info
export const current = (state) => state.pokedex.current

export default pokedexSlice.reducer