import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import './home.css'

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    password: string;
}

const Home: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loggedUser } = location.state || {};
    const [user, setUser] = useState<User | null>(loggedUser);
    const [error, setError] = useState('');

    return (
        <div className="home-container">
            <Sidebar loggedUser={user} />
            <div className='content'>
                {user ? (
                    <>
                        <h1>היוש {user.first_name} {user.last_name}</h1>

                    </>
                ) : (
                    <p>Loading...</p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Home;
