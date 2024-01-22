const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
require('dotenv').config()
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!) : Book
    editAuthor(author: String!, setBornTo: Int!) : Author
    createUser(username: String!, favoriteGenre: String!) : User
    login(username: String!, password: String!) : Token
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
    me: async (root, args, { currentUser }) => {
      return currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

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
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const author = await Author.findOne({ name: args.author })
      if (!author) return null

      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, { username, favoriteGenre }) => {
      try {
        const user = await new User({ username, favoriteGenre }).save()
        return user
      } catch (error) {
        throw new GraphQLError('Failed to create a user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        })
      }
      const userForToken = {
        username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
