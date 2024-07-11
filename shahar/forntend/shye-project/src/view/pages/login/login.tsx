import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';
import { baseURL } from '../../../const';

interface FormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
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
            setIsPasswordValid(value.length < 7);
            if (value.length > 6) {
                setError('Password must have up to 6 characters');
            } else {
                setError('');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = isEmailValid && isPasswordValid && formValues.email && formValues.password;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formValues;

        try {
            const response = await axios.post(`${baseURL}/api/userLogin`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.status)
            if (response.status) {
                setError('');
                navigate('/home', { state: { email } }); // Pass email as state
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
                            <p className={error ? 'visible' : 'invisible'}>
                                <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                            </p>
                        </div>
                        <div>
                            <button type="submit" className={`login-button ${isFormValid ? 'valid' : ''}`}>Login</button>
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