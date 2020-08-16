const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub
} = require('apollo-server')

const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { assertLeafType } = require('graphql')

mongoose.set('useFindAndModify', false)

MONGODB_URI = '...'
const JWT_SECRET = 'SECRET_KEY'

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI),
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message) 
    })

const typeDefs = gql`  
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type Author { 
    id: ID!   
    name: String!
    born: Int    
    bookCount: Int      
  }  

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  } 
  
  type Token {
    value: String!
  }  
  
  type Query {
    me: User,
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]      
    author: [Author!]!
    allAuthors: [Author!]!     
  }

  type Subscription {
    bookAdded: Book!
  } 

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]
    ): Book    

    addAuthor(
        name: String!  
        born: Int                
    ): Author 

    editAuthor(   
        name: String!      
        setBornTo: Int!               
    ): Author 

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token   
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {

      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }

      else {

        const currentAuthor = await Author.findOne({ name: args.author })
        const authorId = currentAuthor._id

        if (args.author && args.genre) {        
          return Book.find({ genres: { $in: [args.genre] }, author: { $in: authorId } })
        }

        if (args.author) {        
          const books = await Book.find({ author: { $in: authorId } }).populate('author')
          return books
        }
      }
    },

    allAuthors: async () => await Author.find()    
  }, 

  Book: {
    author: async (root) => {
      const currentAuthor = await Author.findOne({ _id: root.author._id })
      // console.log(currentAuthor)
      return currentAuthor
    }
  },

  Author: {
    bookCount: async (root) => {
      const currentAuthor = await Author.findOne({ name: root.name })
      const authorId = currentAuthor.id
      const books = await Book.find({ author: authorId })      
      return books ? books.length : 0
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let book

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          book = new Book({ ...args, author: author._id })
          await book.save()
        }

        if (!author) {
          const author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
          })
          await author.save()

          book = new Book({ ...args, author: author._id })
          await book.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },    

    addAuthor: (root, args) => {  
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = new Author({ ...args})	
      return author	       
    }, 

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (author) {
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      }
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,        
        favoriteGenre: user.favouriteGenre,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }, 
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})