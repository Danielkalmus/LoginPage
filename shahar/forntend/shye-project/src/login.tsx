import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';

interface FormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formValues;

        if (email === '' || password === '') {
            setError('Username and password are required');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setError('');
                navigate('/home');
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h1>SHYE</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="johndoe@example.com"
                                value={formValues.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        <div className="error-container">
                            <p className={error ? 'visible' : 'invisible'}>
                                <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                            </p>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        <div className="signup-container">
                            <p>
                                Don't already have an account? <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;