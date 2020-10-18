import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'

import {
  addComment,
  addLikes,
  removeBlog,
  initializeBlogs,
} from '../reducers/blogReducer'

import { initializeUsers } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import Button from './Button'
import Comment from './Comment'

import {
  ButtonGroup,
} from '@material-ui/core'

const Blog = ({ blog, users, blogVisible, setNotification }) => {

  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const loggedUser = useSelector((state) => state.login)
  const user = users.find((u) => u.id === loggedUser.id)

  if (!blog || !user) {
    return null
  }

  const handleLikesIncr = (blogObject) => {
    try {
      const blogId = blogObject.id
      const updateBlogEntry = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        user: blogObject.user.id,
        likes: blogObject.likes + 1
      }

      dispatch(addLikes(blogId, updateBlogEntry))
      setNotification(`Number of likes for entry ${blogObject.title} was updated`, 'success', 5)
    }
    catch (exception) {
      setNotification('Smth went wrong', 'error', 5)
    }
  }

  const handleLikes = (event) => {
    event.preventDefault()
    handleLikesIncr(blog)
  }

  const handleComment = async (event) => {
    event.preventDefault()

    try {
      const comment = { commentText }
      dispatch(addComment(blog, comment))
      setCommentText('')
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleRemove = (blogObject) => {
    if (window.confirm(`Delete ${blogObject.title}?`)) {
      try {
        dispatch(removeBlog(blogObject.id))
        setNotification(`Entry ${blogObject.title} was removed`, 'success', 5)
        history.push('/blogs')
      } catch (error) {
        setNotification(`Entry '${blogObject.title}' can't be removed from server. Unauthorized`, 'error', 5)
      }
    }
  }

  const handleDelete = (event) => {
    event.preventDefault()
    handleRemove(blog)
  }

  const blogMin = (
    <>
      <Link  key={blog.id}  to={`/blogs/${blog.id}`}>{blog.title}</Link><br/>
    </>
  )

  const blogMax = (
    <>
      {blog.title}<br/>
      {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes}<br/>

      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button handleClick={handleLikes} text='like' /><br/>
      </ButtonGroup>

      <h3>Add comment:</h3>
      <form onSubmit={handleComment}>
        <div>
          <input
            type='text'
            value={commentText}
            name='commentText'
            onChange={({ target }) => setCommentText(target.value)}
          />
          <button type='submit'>comment</button>
        </div>
      </form>

      {blog.comments && (
        <ul>
          {blog.comments.map(comment => {
            return (
              <li key={comment.id}>
                <Comment comment={comment} />
              </li>
            )
          })}
        </ul>
      )}

      { user.blogs.find(b => b.id === blog.id) ?
        <Button handleClick={handleDelete} text='remove' />
        : null
      }

    </>
  )

  return (
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
    </div>
  )}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}
const mapDispatchToProps = {
  initializeUsers,
  initializeBlogs,
  setNotification,
  removeBlog,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

