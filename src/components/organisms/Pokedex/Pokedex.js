import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemonsAsync, namesPokemon, pagination, pokemonsList, setPagination } from '../../../store/Slices/pokemonSlice'
import { current, info, power, screen, setInfo, setPower, setScreen } from '../../../store/Slices/pokedexSlice'
import Button from '../../atoms/Button/Button'
import Icon from '../../atoms/Icon/Icon'
import Input from '../../atoms/Input/Input'
import ToggleSwitch from '../../atoms/ToggleSwitch/ToggleSwitch'
import ScreenPokedex from '../../molecules/ScreenPokedex/ScreenPokedex'
import './pokedex.css'
import { setCurrentCard } from '../../../store/Slices/pokedexSlice'
import { getNameFromKey, getOfPrincipalObjectByKey } from '../../../utils/functions'

const Pokedex = () => {
  const isInfo = useSelector(info)
  const within = useSelector(screen)
  const currentPokemon = useSelector(current)
  const page = useSelector(pagination)
  const pokemons = useSelector(pokemonsList)
  const isPower = useSelector(power)
  const dispatch = useDispatch()

  useEffect(() => {
    function handleDispatch() {
      dispatch(fetchPokemonsAsync())
    }
    handleDispatch()
  }, [dispatch])

  const handlePagination = (action) => {
    if (!isPower) {
      return
    }
    if (within[0] === 'card') {
      dispatch(setCurrentCard(action)) // sum or res
    } else {
      dispatch(setPagination(action))
    }
  }


  const handlePower = () => {
    dispatch(setPower(isPower))
    if (isPower === false) {
      dispatch(setPagination('reset'))
    }
  }

  const handleInfo = () => {
    dispatch(setInfo(isInfo))
  }

  useEffect(() => {
    if (isInfo === true) {
      setTimeout(() => { dispatch(setInfo(isInfo)) }, 4000)
    }
  }, [isInfo, dispatch])


  return (
    <div className='pokedex d-flex flex-column px-4 py-3'>
      <div className='d-flex flex-row justify-content-between'>
        <div className='d-flex flex-row'>
          <Button className="button cyan circle"></Button>
          <Button className="button green ms-2" onClick={() => dispatch(setScreen(['list', 'back']))}>
            <Icon type="reload" className="icon-sm" />
          </Button>
          <Button className="button yellow ms-2" onClick={() => handleInfo()}>
            <Icon type="help" className="icon-sm" />
          </Button>
          {
            isInfo ? <div className='container-info p-1 mx-1 mt-0 d-flex justify-content-center align-items-center'>
              <span className='text-information text-light'>You can see the features of your favorite pokemons, start by turning on the device! {'>'}</span>
            </div> : null
          }
        </div>
        <ToggleSwitch onClick={() => handlePower()} checked={isPower} />
      </div>
      <ScreenPokedex pokemons={pokemons} />
      <div className='d-flex flex-row mt-4'>
        <Button className="button circle blue"></Button>
        <Button className="button large green ms-3 text-btn-page btn-page-green"
          disabled={
            within[0] === 'list' ? page[0] === 0 : currentPokemon === 0
          }
          onClick={() => handlePagination('res')}>{'prev'}</Button>
        <Button className="button large yellow ms-2 text-btn-page btn-page-yellow"
          disabled={
            within[0] === 'list' ? page[1] === 1155 : currentPokemon >= 1153
          }
          onClick={() => handlePagination('sum')}>{'next'}</Button>
      </div>
      <div className='d-flex flex-row mt-3 justify-content-around'>
        <Input />
        <Button className="button-relieve ms-2"></Button>
      </div>
      <a href='https://github.com/kevinkag' target="_blank" rel="noreferrer" style={{ fontSize: '0.6rem', color: '#800000', textAlign: 'end', margin: 0, padding: 0 }}>@kevinkag</a>
    </div>
  )
}

export default Pokedex