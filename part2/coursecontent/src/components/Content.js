import React from 'react'
import Part from './Part'

export default function Content(props) {
  const total = props.course.parts.reduce((acc, value) => {
    return acc + value.exercises
  }, 0)

  const parts = props.course.parts.map((item, index) => (
    <p key={index}>
      <Part part={{ name: item['name'], ex: item['exercises'] }} />
    </p>
  ))
  return (
    <div>
      {parts}
      <h5>total of {total} exercises</h5>
    </div>
  )
}
