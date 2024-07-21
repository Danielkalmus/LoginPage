import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../const';
import './UserTable.css';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getAllUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error('There was an error fetching the data !', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const dateA = new Date(a.age);
      const dateB = new Date(b.age);
      if (sortOrder === 'asc') {
        return dateA < dateB ? -1 : 1;
      } else {
        return dateA > dateB ? -1 : 1;
      }
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>User List</h2>
      <div>
        <input
          className='search-box'
          name='searchBox'
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <p></p>
      </div>
      <table>
        <thead>
          <tr className='headers-table'>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>
              Age {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
