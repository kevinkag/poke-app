import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCard, setScreen } from '../../../store/Slices/pokedexSlice'
import { namesPokemon } from '../../../store/Slices/pokemonSlice'
import { capitalizeFirstLetter, getKeyFromName } from '../../../utils/functions'
import Icon from '../../atoms/Icon/Icon'
import './itempokemon.css'

const ItemPokemon = ({ item }) => {

  const arrayNames = useSelector(namesPokemon)
  const dispatch = useDispatch()

  const handleClickItem = (name) => {
    const key = getKeyFromName(name, arrayNames)
    dispatch(setCurrentCard(key))
    dispatch(setScreen(['card', name]))
  }
  return (
    <li onClick={() => handleClickItem(item.name)}
      className='list-group-item rounded-0 border-bottom border-1 border-start-0 border-end-0 border-secondary d-flex flex-row justify-content-between'>
      <div className='texto fs-6 fw-bold'>{capitalizeFirstLetter(item.name.replaceAll('-',' '))}</div>
      <div><Icon type="chevron-right" className='icon' /></div>
    </li>
  )
}

export default ItemPokemon