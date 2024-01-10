import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material'
import { BorderedTD, StyledTH } from '../styles/Table'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then((res) => setUsers(res))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <StyledTH>
            <TableRow>
              <BorderedTD />
              <BorderedTD>blogs created</BorderedTD>
            </TableRow>
          </StyledTH>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <BorderedTD>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </BorderedTD>
                  <BorderedTD>{user.blogs.length}</BorderedTD>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
