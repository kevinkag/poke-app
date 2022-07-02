import React from 'react'
import './loadingpokedex.css'

const LoadingPokedex = ({text}) => {
    return (
        <div className='contenedor p-1 mt-3 px-2 py-2 border border-1 border-dark'>
            <div className='d-flex flex-column justify-content-center align-items-center screen text-light bg-dark border border-2 border-dark rounded p-1'>
                <img src={require('../../assets/pokedex.png')} alt="pokedex" className='img-pokedex'/>
                <span className='fs-6 text-secondary'>{text}</span>
            </div>
        </div>
    )
}

export default LoadingPokedex