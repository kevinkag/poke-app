import React from 'react'
import svg_chevron from '../../assets/chevron.svg'
import svg_power from '../../assets/power.svg'
import svg_reload from '../../assets/reload.svg'
import svg_help from '../../assets/help.svg'
import PropTypes from 'prop-types'
import './icon.css'

const Icon = ({ type, className }) => {
  return (
    <img src={select_icon(type)} alt="icon" className={className} />
  )
}

Icon.propTypes = {
  type: PropTypes.oneOf(['chevron-right', 'power', 'reload','help']),
  className: PropTypes.string
}



function select_icon(chevron) {
  let result
  switch (chevron) {
    case 'chevron-right':
      result = svg_chevron
      break;
    case 'power':
      result = svg_power
      break;
    case 'reload':
      result = svg_reload
      break;
    case 'help':
      result = svg_help
      break;
    default:
      result = svg_chevron
      break;
  }
  return result
}

export default Icon