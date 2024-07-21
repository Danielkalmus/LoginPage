export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    password: string;
}
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import UserSessionContext from '../../../userSessionProvider';
import Sidebar from '../sidebar/sidebar';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { data: user, error } = useContext(UserSessionContext)!;

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="home-container">
            <Sidebar />
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
