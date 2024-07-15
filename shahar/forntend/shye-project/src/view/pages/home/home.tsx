import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSettings = () => {
        navigate('/home/settings', { state: { user } });
    }

    const handleLogout = () => {
        // Implement your logout logic here
        navigate('/login');
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="home-container">
            <button className="open-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {user && (
                    <>
                        <button onClick={handleSettings}>Account Settings</button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
            <div className="content">
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
