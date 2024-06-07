import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './signUp.css'

function signUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className='container'>
            <div className='sign-up-form'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className='input-group'>
                            <label>First Name:</label>
                            <input
                                type="text"
                                placeholder='john'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                placeholder='doe'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            type="text"
                            placeholder='johndoe@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p></p>
                    <button type="submit">Create Account</button>
                    <div className='option-log-in'>
                        <p>Already have an account? <NavLink to="/">Log in</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default signUp;