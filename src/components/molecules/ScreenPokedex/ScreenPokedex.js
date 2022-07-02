import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemonsAsync, pagination, pokemonsList } from '../../../store/Slices/pokemonSlice'
import './screenpokedex.css'
import PokemonList from '../PokemonList/PokemonList'
import PokedexOff from '../../atoms/PokedexOff/PokedexOff'
import PokemonCard from '../PokemonCard/PokemonCard'
import { power, screen } from '../../../store/Slices/pokedexSlice'

const ScreenPokedex = ({pokemons}) => {
	
	const isOn = useSelector(power)
	const inScreen = useSelector(screen)
	const { 0: init, 1: lat } = useSelector(pagination)
	const dispatch = useDispatch()

	return (
		isOn ?
			inScreen[0] === 'list'
				?
				<PokemonList pokemons={pokemons} init={init} lat={lat} isOn={isOn} />
				:
				<PokemonCard />
			:
			<PokedexOff isOn={isOn} />
	)
}

export default ScreenPokedex