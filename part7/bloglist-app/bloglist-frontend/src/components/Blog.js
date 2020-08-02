import React, { useState } from 'react'
import Button from './Button'
import { ButtonGroup } from '@material-ui/core'

const Blog = ({ blog, handleLikesIncr, handleRemove }) => {

  const [blogVisible, setBlogVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const handleLikes = (event) => {
    event.preventDefault()
    handleLikesIncr(blog)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    handleRemove(blog)
  }

/*   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 */
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

  const handleVisible = () => {
    setBlogVisible(!blogVisible)
    !blogVisible ? setButtonText('hide') : setButtonText('view')
  }

  return (
    // <div style={blogStyle} id='blog'>
    <div id='blog'>
      { blogVisible ?
        <div className="maxDetails">
          {blogMax}
        </div>
        :
        <div className="minDetails">
          {blogMin}
        </div>
      }
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button handleClick={handleVisible} text={buttonText} /><br/>
        <Button handleClick={handleLikes} text='like' /><br/>
        <Button handleClick={handleDelete} text='remove' />
      </ButtonGroup> 
    </div>
  )}

export default Blog


