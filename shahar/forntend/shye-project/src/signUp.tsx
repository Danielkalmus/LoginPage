import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './signUp.css'

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formValues;

        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password', confirmPassword);

        if (password.length < 8) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters long'
            }));
            return;
        }

        else if (password !== confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: "Passwords don't match"
            }));
            return;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }))
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
                                name='firstName'
                                placeholder='john'
                                value={formValues.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name='lastName'
                                placeholder='doe'
                                value={formValues.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            type="email"
                            name='email'
                            placeholder='johndoe@example.com'
                            value={formValues.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='errors-container'>
                        <p className={errors.email ? 'visible' : 'invisible'}>
                            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.email}
                        </p>
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input
                            type="password"
                            name='password'
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='errors-container'>
                        <p className={errors.password ? 'visible' : 'invisible'}>
                            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.password}
                        </p>
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password:</label> {/* New confirm password field */}
                        <input
                            type="password"
                            name='confirmPassword'
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='errors-container'>
                        <p className={errors.confirmPassword ? 'visible' : 'invisible'}>
                            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.confirmPassword}
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

export default SignUp;