import React from 'react'
import './button.css'

const Button = ({className, children, onClick, disabled }) => {
    return (
        <>
            <button disabled={disabled} className={`${className}`} onClick={onClick}>{children}</button>
        </>

    )
}


export default Button