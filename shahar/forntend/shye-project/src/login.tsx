import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log('Username:', Email);
        console.log('Password:', Password);

        if (Email === '' || Password === '') {
            setError('Username and password are required');
            return;
        }

        if (Password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setError('');
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="login-form">
                <h1>SHYE</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                placeholder='johndoe@example.com'
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='error-container'>
                            <p className={error ? 'visible' : 'invisible'}>
                                <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                            </p>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        <div className="signup-container">
                            <p>Don't already have an account? <button type="button" onClick={() => navigate('/signUp')}>Sign Up</button></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;