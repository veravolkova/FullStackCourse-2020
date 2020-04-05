import React from 'react'

export default function PersonList(props) {
  return (
    <ul>
      {props.persons.map((person, i) => (
        <li key={i}> {person.name} {person.number}
          <button onClick={() => props.handleDelete(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  )
}





