import React, { useEffect } from 'react'
import { fetchPokemonByIdAsync, itemPokemon, status } from '../../../store/Slices/itemPokemonSlice'
import { current, screen, setScreen } from '../../../store/Slices/pokedexSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ScreenPokedexLayout } from '../../layout/ScreenPokedexLayout/ScreenPokedexLayout'
import './pokemoncard.css'
import svg_minipoke from '../../assets/mini-pokedex.svg'
import { cleanLocationStr, getNameFromKey } from '../../../utils/functions'
import { namesPokemon, pokemonsList } from '../../../store/Slices/pokemonSlice'
import LoadingPokedex from '../../atoms/LoadingPokedex/LoadingPokedex'
import svg_exp from '../../assets/exp.svg'
import svg_location from '../../assets/location.svg'

const PokemonCard = () => {

  const item = useSelector(itemPokemon)
  const pokemons = useSelector(pokemonsList)
  const arrayNames = useSelector(namesPokemon)
  const isLoaded = useSelector(status)
  const currentPokemon = useSelector(current)
  const name = useSelector(screen)
  const dispatch = useDispatch()

  useEffect(() => {
    function handleItemPokemon() {
      const name = getNameFromKey(arrayNames, currentPokemon)
      dispatch(setScreen(['card', name]))
      dispatch(fetchPokemonByIdAsync(name))
    }
    handleItemPokemon()
  }, [dispatch, currentPokemon, arrayNames])

  if (isLoaded === 'pending') {
    return <LoadingPokedex text="loading pokemon, wait..." />
  }

  return (
    <ScreenPokedexLayout>
      <div className='d-flex py-1 align-items-center justify-content-between'>
        <div className="d-flex ms-1 flex-row align-items-center">
          <img src={svg_minipoke} className="icon" alt="mini pokedex icon" />
          <div className='text-start ms-2 text-name'>
            {item?.name}
          </div>
        </div>
        <div className='ms-4 text-danger fw-bold text-stats'>
          #{item?.id}
        </div>
      </div>

      <div className='d-flex flex-row justify-content-around'>
        <div className='d-flex flex-column align-items-center'>
          <div className='d-flex flex-row'>
            {
              item.types?.map((item, i) => (
                <div key={i} className={`text-center text-stats rounded type ${item.type.name} fw-bold text-light`}>
                  {
                    item.type.name
                  }
                </div>
              ))
            }
          </div>
          <div>
            <img className='child mt-1' src={item.sprites?.front_default !== null ? item.sprites?.front_default : require('../../assets/pokedex.png')} alt="imagen del pokemon" />
          </div>
        </div>
        <div className='d-flex flex-column justify-content-around'>
          <div className='d-flex'>
            <div className=' w-100 px-2 text-light bg-danger text-stats fw-bold text-center rounded-start'>
              ATK:<br /> {item.stats && item.stats[1]?.base_stat}
            </div>
            <div className=' w-100 px-2 text-light bg-primary text-stats fw-bold text-center border-end border-start border-1'>
              DEF: <br />{item.stats && item.stats[2]?.base_stat}
            </div>
            <div className=' w-100 px-2 text-light bg-success text-stats fw-bold text-center rounded-end'>
              HP: <br />{item.stats && item.stats[0]?.base_stat}
            </div>
          </div>
          <div className='d-flex'>
            <div className='w-100  px-2 text-light bg-info text-stats fw-bold text-center rounded-start'>
              SPD: <br />{item.stats && item.stats[5]?.base_stat}
            </div>
            <div className='w-100 px-2 text-light bg-secondary text-stats fw-bold text-center border-end border-start border-1'>
              ATS:<br /> {item.stats && item.stats[3]?.base_stat}
            </div>
            <div className='w-100 px-2 text-light bg-secondary text-stats fw-bold text-center rounded-end'>
              DFS:<br /> {item.stats && item.stats[4]?.base_stat}
            </div>
          </div>
        </div>

      </div>
      {
        item.moves &&
        item.moves.length > 0 &&
        <div className='tabla-moves row row-cols-3 text-center m-0 text-moves fw-bold'>
          {
            item.moves?.slice(0, 15).map((item, i) => (
              <div key={i} className='col px-0 border-1 mb-1 border-end'>{item.move.name}</div>
            ))
          }
        </div>
      }
      <div className='d-flex justify-content-between py-2 text-stats'>
        {
          item.abilities &&
          item.abilities.length > 0 && <div className=''>
            <div className='h-auto px-4 label-abilities text-center border border-1 border-bottom-0 rounded-top fw-bold'>Abilities:</div>
            <div className='h-auto container-abilities border rounded-bottom border-top-0 border-1 fw-bold'>
              {
                item.abilities?.slice(0, 3).map((item, i) => (
                  <div key={i} className='text-start ms-1'>- {item.ability.name.replaceAll('-', ' ')}</div>
                ))
              }
            </div>
          </div>
        }
        <div className='w-50 h-100'>
          <span className="text-stats rounded text-dark">
            <img src={svg_exp} className='icon-sm me-1' alt="icono de experiencia" />
            base experience: {item.base_experience}
          </span>
          {
            item.locations &&
            item.locations.length > 0 &&
            <span className="text-stats text-location text-dark">
              <img src={svg_location} className='icon-sm me-1' alt='location icon' />
              locations: {item.locations.slice(0, 3).map((it) => (` ${cleanLocationStr(item.locations, it['location_area']['name'])}`))}
            </span>
          }
        </div>
      </div>
    </ScreenPokedexLayout>
  )
}

export default PokemonCard