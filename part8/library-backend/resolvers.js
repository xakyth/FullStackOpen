const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

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

        pubsub.publish('BOOK_ADDED', {
          bookAdded: newBook,
        })

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
