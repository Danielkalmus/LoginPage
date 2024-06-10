import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';

interface FormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async () => {
        const { email, password } = formValues;
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });
            console.log(response.data);
            navigate('/home');
        } catch (error) {
            console.error('There was an error logging in!', error);
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
                                placeholder='johndoe@example.com'
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
                                <button type='button' onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
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

}
export default Login;