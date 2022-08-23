import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogForm from './BlogForm'

// 5.16 Make a test for the new blog form. This test should check
// that the form calls the event handler it received as props
// with the right details when a new blog is created.

test('Checks that the event handler receives the expected information', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  // the mock should contain object identical to this after submitting
  const testBlog = {
    title: 'Test Title 123',
    author: 'Author Man',
    url: 'www.testsite.com',
    user: {
      name: 'claude',
      username: 'littleclaude',
    },
  }

  const loggedInUser = {
    name: 'claude',
    username: 'littleclaude',
  }

  render(<BlogForm addBlogHandler={addBlog} user={loggedInUser} />)

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('www.website.com')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test Title 123')
  await user.type(authorInput, 'Author Man')
  await user.type(urlInput, 'www.testsite.com')
  await user.click(createButton)

  expect(addBlog.mock.lastCall[0]).toEqual(testBlog)
})
