import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        // Add authentication logic here
        console.log('Username:      ', Email);
        console.log('Password:', Password);
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
                                type="Password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        <div className="signup-container">
                            <p>Don't already have an account? <button type="button" onClick={() => navigate('/dashboard')}>Sign Up</button></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;