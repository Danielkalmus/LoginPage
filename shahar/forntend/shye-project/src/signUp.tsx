import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './signUp.css'

function signUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('')
        navigate('/');
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
                    <div className='form-group'>
                        <label>Confirm Password:</label> {/* New confirm password field */}
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='error-container'>
                        <p className={error ? 'visible' : 'invisible'}>
                            <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                        </p>
                    </div>
                    <button type="submit">Create Account</button>
                    <div className='option-login'>
                        <p>Already have an account? <NavLink to="/">Log in</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default signUp;