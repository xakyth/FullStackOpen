import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdotes from './reducers/anecdoteReducer'
import filter from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes, filter
})
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)