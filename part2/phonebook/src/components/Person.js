import React from 'react'

const Person = ({ name, number, i }) => {
  return (
    <li key={i}>{name} , {number}</li>
  )
}

export default Person