import React, { useState } from 'react';

function Login() {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', Email, password);
    };
    const handleCreation = () => {
        console.log('Created with:', Email, password);
    };

    return (
        <div>
            <h2>Welcome to Login Page</h2>
                <div>
                    <input
                        placeholder='Email'
                        type="text"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                <br/>
                <button onClick={handleCreation}>Create account</button>
        </div>
    );
}

export default Login;
