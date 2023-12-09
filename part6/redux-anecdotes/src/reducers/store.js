import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
  },
})

export default store
