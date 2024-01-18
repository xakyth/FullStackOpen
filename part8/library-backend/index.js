const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = []

let books = []

const typeDefs = `
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!) : Book
    editAuthor(author: String!, setBornTo: Int!) : Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
      return books.reduce((acc, book) => {
        return book.author === root.name ? acc + 1 : acc
      }, 0)
    },
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books
      if (args.genre && args.author) {
        return books
          .filter((book) => book.genres.find((g) => g === args.genre))
          .filter((book) => book.author === args.author)
      } else if (args.genre) {
        return books.filter((book) => book.genres.find((g) => g === args.genre))
      } else {
        return books.filter((book) => book.author === args.author)
      }
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {
      const author = authors.find((a) => a.name === args.author)
      if (!author) authors.push({ name: args.author, id: uuid() })
      const addedBook = {
        title: args.title,
        published: args.published,
        author: args.author,
        id: uuid(),
        genres: args.genres,
      }
      books.push(addedBook)
      return addedBook
    },
    editAuthor: (root, args) => {
      let author = authors.find((a) => a.name === args.author)
      if (!author) return null
      author = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.id === author.id ? author : a))
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
