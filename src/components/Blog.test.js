import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Blog } from './Blog'

// 5.13 Make a test which checks that the component displaying a blog renders the
// blog's title and author, but does not render its url or number of likes by default.

test('renders title and author', () => {
  const blog = {
    title: 'The Day the Earth Stood Still',
    author: 'Robert Wise',
    likes: 10,
    url: 'www.nbc.com',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('The Day the Earth Stood Still, by Robert Wise')
  screen.debug(element)
  expect(element).toBeDefined()

})

// 5.14 Make a test which checks that the blog's url and number of likes
// are shown when the button controlling the shown details has been clicked

test('details are rendered in the correct view', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'The Day the Earth Stood Still',
    author: 'Robert Wise',
    likes: 10,
    url: 'www.nbc.com',
    user: {
      name: 'Claude',
      username: 'littleclaude',
    }
  }

  const loggedInUser = {
    name: 'claude',
    username: 'littleclaude'
  }

  const { container } = render (<Blog blog={blog} user={loggedInUser}  />)

  const showButton = screen.getByText('view')
  await user.click(showButton)
  const div = container.querySelector('.blog')
  screen.debug(div)

  expect(div).toHaveTextContent('Claude')
})

// 5.15 Make a test which ensures that if the like button is clicked twice,
// the event handler the component received as props is called twice.


