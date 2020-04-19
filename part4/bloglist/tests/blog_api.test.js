const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(title).toContain(
    'React patterns'
  )
})

test('a valid blog entry can be added ', async () => {
  const newBlogEntry = {
    title:'First class tests',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes:10,
  }

  await api
    .post('/api/blogs')
    .send(newBlogEntry)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'First class tests'
  )
})

test.only('blog entry without title and url is not added', async () => {
  const newBlogEntry = {
    author:'Robert C. Martin',
    likes:0,
  }

  await api
    .post('/api/blogs')
    .send(newBlogEntry)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  const author = blogsAtEnd.map(n => n.author)
  expect(author).not.toContain('Robert C. Martin')
})

test('a specific blog entry can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlogEntry = {
    title: 'Go To Statement Considered Harmful',
    author:'Edsger W. Dijkstra',
    url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlogEntry)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const likes = blogsAtEnd.map(n => n.likes)
  expect(likes).toContain(0)
})

afterAll(() => {
  mongoose.connection.close()
})