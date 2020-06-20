import React, { useState } from 'react'

const BlogForm = ({ createBlogEntry }) => {

  const [values, setValues] = useState({ title: '', author: '', url: '' })

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const addBlogEntry = (event) => {
    event.preventDefault()
    createBlogEntry({
      title: values.title,
      author: values.author,
      url: values.url,
    })
    console.log(values.title)
    setValues({ title: '', author: '', url: '' })
  }

  return (
    <div className="formDiv">
      <h4>Create a new entry</h4>
      <form onSubmit={addBlogEntry}>
        <div>
          title
          <input
            type="text"
            id='title'
            value={values.title}
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            id='author'
            value={values.author}
            name="author"
            onChange={handleInputChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            id='url'
            value={values.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm


