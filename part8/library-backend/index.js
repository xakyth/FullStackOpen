const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')

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
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    },
  },
  Query: {
    //TODO:
    bookCount: () => books.length,
    //TODO:
    authorCount: () => authors.length,
    //TODO:
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({})
      if (args.genre && args.author) {
        //TODO: args author as ObjectId? genres contains some String?
        return Book.find({})
      } else if (args.genre) {
        //TODO: prev
        return books.filter((book) => book.genres.find((g) => g === args.genre))
      } else {
        //TODO: prev
        return books.filter((book) => book.author === args.author)
      }
    },
    //TODO:
    allAuthors: async () => {
      const authors = await Author.find({})
      console.log('authors', authors)
      return authors
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })
      return newBook.save()
    },
    //TODO:
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
