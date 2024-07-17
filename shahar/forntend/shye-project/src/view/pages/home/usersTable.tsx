import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { baseURL } from '../../../const';
import { User } from '../../../userSessionProvider';
import './usersTable.css';
import Sidebar from './sidebar';
import UserSessionContext from '../../../userSessionProvider';

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');
    const { data: myuser, error: contextError } = useContext(UserSessionContext)!;

    console.log(myuser);
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

    return (
        <div className="users-page">
            <div className='top-left'>
                <Sidebar />
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
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
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
