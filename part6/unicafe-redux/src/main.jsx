import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducers/reducer'

const store = createStore(reducer)

const App = () => {
  const counterDispatch = (type) => {
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={() => counterDispatch('GOOD')}>good</button>
      <button onClick={() => counterDispatch('OK')}>ok</button>
      <button onClick={() => counterDispatch('BAD')}>bad</button>
      <button onClick={() => counterDispatch('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
