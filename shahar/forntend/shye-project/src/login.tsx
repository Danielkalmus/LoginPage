import { useState } from 'react';
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formValues;

        console.log('Username:', email);
        console.log('Password:', password);

        if (email === '' || password === '') {
            setError('Username and password are required');
            return;
        }

        if (password.length < 8) {
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