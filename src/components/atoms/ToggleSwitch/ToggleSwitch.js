import React from 'react'
import './toggle.css'

const ToggleSwitch = ({ checked, onClick }) => {
    return (
        <label className="switch" >
            <input type="checkbox" checked={checked} readOnly onClick={onClick} />
            <span className="slider round">
                <div className='textos me-1 d-flex justify-content-around'>
                    <div>off</div>
                    <div>on</div>
                </div>
            </span>
        </label>
    )
}

export default ToggleSwitch