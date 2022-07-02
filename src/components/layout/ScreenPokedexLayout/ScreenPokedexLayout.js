import React from 'react'
import './screenpokedexlayout.css'

export const ScreenPokedexLayout = ({ children, className, isOn=true }) => {
    return (
        <div className='contenedor p-1 mt-3 px-2 py-2 border border-1 border-dark'>
            <div className={`${isOn ? 'screen' : 'screen-off'} container border border-2 border-dark rounded ${className}`}>
                {children}
            </div>
        </div>
    )
}
