import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSessionContext from '../../../userSessionProvider'; // Adjust path as needed
import { faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';

interface FormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
    const [frontError, setFrontError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const { signin, error } = useContext(UserSessionContext)!;
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
        if (name === "email") {
            setIsEmailValid(validateEmail(value));
        }
        if (name === "password") {
            setIsPasswordValid(value.length <= 6);
            if (value.length > 6) {
                setFrontError('Password must have at least 6 characters');
            } else {
                setFrontError('');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = isEmailValid && isPasswordValid && formValues.email && formValues.password;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formValues;
        signin(email, password);
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
                                className={`input ${isEmailValid ? '' : 'invalid'}`}
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
                                    className={`input ${isPasswordValid ? '' : 'invalid'}`}
                                    required
                                />
                                <button type="button" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                        <div className="error-container">
                            <p className={frontError ? 'visible' : 'invisible'}>
                                <FontAwesomeIcon icon={faCircleExclamation} /> {frontError}
                            </p>
                        </div>
                        <div>
                            <button type="submit" className={`login-button ${isFormValid ? 'valid' : ''}`} disabled={!isFormValid}>Login</button>
                            <div className="signin-error-container">
                                {error && <p>
                                    <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                                </p>}
                            </div>
                        </div>
                        <div className="signup-container">
                            <p>
                                Don't have an account? <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
