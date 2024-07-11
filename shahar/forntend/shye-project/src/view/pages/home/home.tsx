import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

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
    const { email } = (location.state as any) || {};
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/user', {
                params: { email }
            });

            if (response.status === 200) {
                setUser(response.data);
            } else {
                setError(response.data.message || 'An error occurred');
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
                setError((axiosError.response.data as any).message);
            } else {
                setError('An error occurred');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/home/settings', { state: { user } });
    }

    useEffect(() => {
        if (email) {
            fetchUserData();
        }
    }, [email]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {user ? (
                    <>
                        <h1>היוש {user.first_name} {user.last_name}</h1>
                        <button type="submit">Account Settings</button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </form>
    );
};

export default Home;
