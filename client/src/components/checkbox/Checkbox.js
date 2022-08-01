import React from 'react'
import './checkbox.css'

export function Checkbox({option}) {
  return (
    <label htmlFor={option[Object.keys(option)].id} className="checkbox">
      <input type="checkbox" name={option[Object.keys(option)].id} id={option[Object.keys(option)].id}/>
      {Object.keys(option)}
    </label>
  )
}