import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { baseURL } from '../../../const';
import { User } from '../../../userSessionProvider';
import './usersTable.css';
import Sidebar from '../sidebar/sidebar';
import UserSessionContext from '../../../userSessionProvider';

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');
    const { data: myuser, error: contextError } = useContext(UserSessionContext)!;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/users`);
                setUsers(response.data);
            } catch (error) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const sortUsersByAge = () => {
        const sortedUsers = [...users].sort((a, b) => {
            const dateA = new Date(a.birthday);
            const dateB = new Date(b.birthday);
            if (sortOrder === 'asc') {
                return dateA < dateB ? -1 : 1;
            } else {
                return dateA > dateB ? -1 : 1;
            }
        });
        setUsers(sortedUsers);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const generateUsers = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/randomUserX10`);
            setUsers(response.data.usersArray);
            alert("✅")
        } catch (error) {
            setError('Failed to generate users');
        }
    }

    return (
        <div className="users-page">
            <div className='top-left'>
                <Sidebar />
            </div>
            <div className='top-right'>
            <button onClick={generateUsers}>generate 10 new users</button>
                <input
                    className='search-box'
                    name='searchBox'
                    type="text"
                    placeholder="Search by email"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <h2>Users</h2>
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th onClick={sortUsersByAge} style={{ cursor: 'pointer' }}>
                            Birthday {sortOrder === 'asc' ? '▲' : '▼'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} className={user.id === myuser?.id ? 'logged-in-user' : ''}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.birthday}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
