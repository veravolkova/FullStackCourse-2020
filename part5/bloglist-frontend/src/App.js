import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlogEntry = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
      setMessage(`Entry ${blogObject.title} was creaated`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setMessage('smth went wrong')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLikesIncr = (blogObject) => {
    try {
      const blogId = blogObject.id
      const blog = blogs.find(b => b.id === blogId)
      const updateBlogEntry = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        user: blogObject.user.id,
        likes: blogObject.likes + 1
      }
      blogService
        .update(blogId, updateBlogEntry)
        .then(returnedBlog => {
          setBlogs(
            blogs.map(b => (b.id !== blog.id ? b : returnedBlog))
          )
        })
      setMessage(`Number of likes for entry ${blog.title} was updated`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setMessage('smth went wrong')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleRemove = (blogObject) => {
    if (window.confirm(`Delete ${blogObject.title}?`)) {
      blogService
        .remove(blogObject.id)
        .then(res => {
          const filteredBlogs = blogs.filter(b => b.id !== blogObject.id)
          setBlogs(filteredBlogs)
          setMessage(
            `${blogObject.title} has been removed.`
          )
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(
            `Entry '${blogObject.title}' can't be removed from server. Unauthorized`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(null)
    } catch (exception) {
      setMessage('log out error')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog entry' ref={blogFormRef}>
      <BlogForm createBlogEntry={addBlogEntry} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={message} type={messageType}/>

      {user === null ?
        loginForm() :
        <>
          <h4>Blogs</h4>
          <p>{user.name} logged in</p>
          <Button handleClick={handleLogout} text='logout' />
          {blogForm()}
          <ul>
            {blogs
              .sort((a, b) => a.likes < b.likes ? 1 : -1)
              .map((blog, index) => (
                <li key={index}>
                  <Blog blog={blog} handleLikesIncr={handleLikesIncr} handleRemove={handleRemove}/>
                </li>
              )
              )}
          </ul>
        </>
      }

      <Footer />
    </div>
  )
}

export default App