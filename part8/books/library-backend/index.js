const { ApolloServer, gql } = require('apollo-server')
const { find, filter } = require('lodash')

const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`  
  type Book {
    id: ID!
    title: String!
    published: Int! 
    author: String!
    genres: [String]!
  } 

  type Author {
    id: ID!
    name: String!
    born: Int      
    bookCount: Int
  }  
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]      
    author: [Author!]!
    allAuthors: [Author!]!     
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
        year: Int!               
    ): Author 
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,    
    allBooks: (root, args) => {
        if (!args.author && !args.genre) {
          return books
        }
        if (args.author && args.genre) {
            return books.filter(book => book.author.includes(args.author))
                            .filter(book => book.genres.includes(args.genre))
          }
        if (args.author) {
        const byAuthor = (book) =>
          args.author === book.author
            return books.filter(byAuthor)
        }
        if (args.genre) {
            //return books: author => filter(books, { author: author.name }),
            return books = books.filter(book => book.genres.includes(args.genre))        
        }
      },   
    allAuthors: () => authors,  
    authorCount: () => authors.length,
    author: (_, { id }) => find(authors, { id }),
    
      },
    Author: {    
        bookCount: author => filter(books, { author: author.name }).length
      }, 
   /*  Book: {
        author: (root) => {
          const author = find(authors, { name: root.author })
          return {
            name: author.name,
            born: author.born,
          }
        }
      }, */
    Mutation: {    
    addAuthor: (root, args) => {      
        const author = { ...args, id: uuid() }
        authors = authors.concat(author)
        return author
      },
    editAuthor: (root, args) => {
        const author = authors.find(a => a.name === args.name)
        if (!author) {
          return null
        }
    
      const updatedAuthor = { ...author, born: args.year }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    },
    addBook: (root, args) => {     
        const book = { ...args, id: uuid() }
     
        const author = find(authors, { name: args.author })
        if(author) {
          books = books.concat(book)
          return book
        } 
        else {          
          books = books.concat(book)
          return book
        }        
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})