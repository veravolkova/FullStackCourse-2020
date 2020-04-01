import React from 'react';

export default function Persons(props) {
  return (
    <ul>
    {props.persons.map((person, i) => (        
      <li key={i}> {person.name} {person.number} </li>
    ))} 
  </ul> 
  );
}





  