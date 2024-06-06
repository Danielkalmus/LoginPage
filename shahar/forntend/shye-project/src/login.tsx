import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        // Add authentication logic here
        console.log('Username:      ', Email);
        console.log('Password:', password);
    };

    return (
        <div>
            <h1>login</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-login-user'>
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder='example@example.com'
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p></p>
                <button type="submit">Login</button>
                <div>
                    <p>Don't already have an account? </p>
                </div>
                <button type="button" onClick={() => navigate('/dashboard')}>Sign In</button>
            </form>
        </div>
    );
};

export default Login;