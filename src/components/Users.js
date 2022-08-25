import { useState } from 'react'
import usersService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  usersService.getAll().then((users) => setUsers(users))

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
