import { render, screen } from '@testing-library/react'
import Filter from '../../components/Filter'
import filterReducer from '../../reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('<Filter />', () => {
  let store
  let container
  beforeAll(() => {
    store = configureStore({
      reducer: {
        filter: filterReducer,
      },
    })
  })
  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <Filter />
      </Provider>
    ).container
  })
  test('filter textbox rendered', () => {
    const inputElement = container.querySelector('input[name="filter"]')
    expect(inputElement).toBeTruthy()
  })
  test('user can type in filter textbox', async () => {
    const user = userEvent.setup()
    const inputElement = container.querySelector('input[name="filter"]')
    await user.type(inputElement, 'anecdote content xD')
    expect(inputElement.value).toBe('anecdote content xD')
  })
})
