import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './signUp.css';
import SuccessScreen from './successScreen';

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
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formValues;

    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    if (password.length < 8) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long'
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: "Passwords don't match"
      }));
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 2000);
      } else {
        const data = await response.json();

        setErrors(prevErrors => ({
          ...prevErrors,
          email: data.message || 'An error occurred'
        }));
      }
    } catch (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'An error occurred'
      }));
    }
  };

  return (
    <div className="container">
      {showSuccess ? (
        <SuccessScreen />
      ) : (
        <div className="sign-up-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="john"
                  value={formValues.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="doe"
                  value={formValues.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
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
            <div className="errors-container">
              <p className={errors.email ? 'visible' : 'invisible'}>
                <FontAwesomeIcon icon={faCircleExclamation} /> {errors.email}
              </p>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="errors-container">
              <p className={errors.password ? 'visible' : 'invisible'}>
                <FontAwesomeIcon icon={faCircleExclamation} /> {errors.password}
              </p>
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="errors-container">
              <p className={errors.confirmPassword ? 'visible' : 'invisible'}>
                <FontAwesomeIcon icon={faCircleExclamation} /> {errors.confirmPassword}
              </p>
            </div>
            <button type="submit">Create Account</button>
            <div className="option-login">
              <p>
                Already have an account? <NavLink to="/">Log in</NavLink>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
