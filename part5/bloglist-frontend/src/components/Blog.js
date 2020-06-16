import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {

  const [blogVisible, setBlogVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogMin = (
    <>
      {blog.title}<br/>
      {blog.author}<br/>
    </>
  )

  const blogMax = (
    <>
      {blog.title}<br/>
      {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes}<br/>
    </>
  )

  const handleButtonClick = () => {
    setBlogVisible(!blogVisible)
    !blogVisible ? setButtonText('hide') : setButtonText('view')
  }

  return (
    <div style={blogStyle} >
      { blogVisible ? blogMax : blogMin }
      <Button handleClick={handleButtonClick} text={buttonText} />
    </div>
  )}

export default Blog

