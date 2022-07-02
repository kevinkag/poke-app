import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cache, fieldSearch, setListFromCache, setSearch, } from '../../../store/Slices/pokemonSlice'
import { screen, setScreen } from '../../../store/Slices/pokedexSlice'
import './input.css'

const Input = () => {
  const fdSearch = useSelector(fieldSearch)
  const cacheList = useSelector(cache)
  const mode = useSelector(screen)
  const dispatch = useDispatch()
  const handleOnChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (value === '') {
      dispatch(setListFromCache(cacheList))
    }
    dispatch(setSearch(value))

  }

  const handleBackToList = () => {
      dispatch(setScreen(['list','back']))
  }
  return (
    <>
      <input
        onClick={() => handleBackToList()}
        placeholder='Search pokemon...'
        onChange={handleOnChange}
        className='input py-2 px-2'
      />
    </>
  )
}

export default Input