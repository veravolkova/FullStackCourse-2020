import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, Vera Popova 2020</em>
    </div>
  )
}

export default Footer