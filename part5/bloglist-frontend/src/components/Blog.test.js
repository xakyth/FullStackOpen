import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  beforeEach(() => {
    const blog = {
      title: '8blog title',
      author: '8blog author',
      url: '8http://tst2-123.ru',
      likes: 10,
      user: {
        username: 'jojo',
        name: 'Deniska',
        id: '6558b254ae9f1ea3b8400030',
      },
      id: '655ba26500eebe8e4222b767',
    }
    const user = {
      username: 'xakyth',
      name: 'Roman',
    }
    container = render(<Blog
        blog={blog}
        user={user}
        handleLike={() => null}
        handleRemove={() => null}
    />).container
  })

  test("blog's title and author rendered by default, but no URL likes user", () => {
    const short = container.querySelector('.blogShort')
    const full = container.querySelector('.blogFull')
    expect(short).not.toHaveStyle('display: none')
    expect(full).toHaveStyle('display: none')
  })

  test('blog expands when view button is clicked', async () => {
    const user = userEvent.setup()
    const short = container.querySelector('.blogShort')
    const full = container.querySelector('.blogFull')
    const viewButton = screen.getByText('view')
    
    await user.click(viewButton)
    expect(short).toHaveStyle('display: none')
    expect(full).not.toHaveStyle('display: none')
  })
})
