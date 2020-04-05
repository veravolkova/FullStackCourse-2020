import React from 'react'
import Button from './Button'

export default function Countries(props) {
  const countryList = props.countries.map((country, index) => (
    <li key={index}>
      {country.name}
      <Button handleClick={() => props.onClick(country)} text='show' />
    </li>
  ))

  return <div>{countryList}</div>;
}
