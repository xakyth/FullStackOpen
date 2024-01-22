const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError } = require('graphql')

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
    bookCount: async () => {
      return Book.collection.countDocuments()
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (!args.author && !args.genre) {
        filter = {}
      } else if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author })
        filter = { genres: { $in: [args.genre] }, author: author._id }
      } else if (args.genre) {
        filter = { genres: { $in: [args.genre] } }
      } else {
        const author = await Author.findOne({ name: args.author })
        filter = { author: author._id }
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Failed to create an author', {
            extensions: {
              code: 'BAD_USER_INPPUT',
              error,
            },
          })
        }
      }
      let newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })
      try {
        newBook = newBook.save().then((b) => b.populate('author'))
        return newBook
      } catch (error) {
        throw new GraphQLError('Failed to add a book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) return null

      author.born = args.setBornTo
      return author.save()
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
