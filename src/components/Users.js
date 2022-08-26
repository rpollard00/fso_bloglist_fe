import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div className="block">
      <h2 className="title">Users</h2>
      <table className="table is-hoverable is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
