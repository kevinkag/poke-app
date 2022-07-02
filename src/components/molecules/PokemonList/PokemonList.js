import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { screen } from '../../../store/Slices/pokedexSlice'
import ErrorNoResults from '../../atoms/ErrorNoResults/ErrorNoResults'
import LoadingPokedex from '../../atoms/LoadingPokedex/LoadingPokedex'
import { ScreenPokedexLayout } from '../../layout/ScreenPokedexLayout/ScreenPokedexLayout'
import ItemPokemon from '../ItemPokemon/ItemPokemon'

const PokemonList = ({ pokemons, init, lat }) => {

	const screenMode = useSelector(screen)
	const [component, setcomponent] = useState('loading')

	useEffect(() => {
		let ignore = false
		if (!ignore) {
			if (screenMode[1] === 'back') {
				setcomponent('idle')
			} else {
				setInterval(() => {
					setcomponent('idle')
				}, 1000)
			}
			return () => {
				ignore = true
			}
		}
	}, [screenMode])


	if (component === 'loading') {
		return <LoadingPokedex text="turning on..." />
	}

	return (
		<ScreenPokedexLayout>
			<ul className='list-group my-3'>
				{pokemons.length === 0
					?
					<ErrorNoResults />
					:
					pokemons.slice(init, lat).map((item, i) => (
						<ItemPokemon key={i} item={item} />
					))}
			</ul>
		</ScreenPokedexLayout >
	)
}

export default PokemonList