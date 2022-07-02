import { api } from '../api'

export const fetchAllPokemons = async (page) => {
    try {
        const response = await api.get(`/pokemon?limit=1154&offset=${page}`)
        return response.data
    } catch (error) {
        return error
    }
}

export const fetchPokemonById = async (id) => {
    try {
        const response = await api.get(`pokemon/${id}`)
        const res_encounters = await api(`pokemon/${id}/encounters`)
        const result = Object.assign(response.data, { locations: res_encounters.data })
        return result
    } catch (error) {
        return error
    }
}

