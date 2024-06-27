import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './signUp.css';
import SuccessScreen from '../../../successScreen';

interface FormValues {
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message: string;
}

const SignUp: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const isHebrew = (text: string) => /^[\u0590-\u05FF\s]+$/.test(text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === 'firstName' && !isHebrew(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: 'First name must be in Hebrew' }));
    } else if (name === 'firstName') {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
    }

    if (name === 'lastName' && !isHebrew(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Last name must be in Hebrew' }));
    } else if (name === 'lastName') {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
    }
    if (name === 'birthday') {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthday: 'You must be at least 10 years old to sign up'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthday: ''
        }));
      }
    }
    if (name === 'password' && value.length > 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must have up to 6 characters' }));
    } else if (name === 'password') {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, birthday, email, password, confirmPassword } = formValues;

    setErrors({
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    if (!isHebrew(firstName)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        firstName: 'First name must be in Hebrew'
      }));
      return;
    }

    if (!isHebrew(lastName)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        lastName: 'Last name must be in Hebrew'
      }));
      return;
    }

    if (password.length > 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must have up to 6 characters'
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
      const response = await axios.post('http://localhost:3001/api/auth/signup', {
        firstName,
        lastName,
        birthday,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 3000);
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: response.data.message || 'An error occurred'
        }));
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;

      const errorMessage = axiosError.response?.data?.message ?? 'An error occurred';
      setErrors(prevErrors => ({
        ...prevErrors,
        email: errorMessage
      }));
    }
  }

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
                <div className="errors-container">
                  <p className={errors.firstName ? 'visible' : 'invisible'}>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {errors.firstName}
                  </p>
                </div>
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
                <div className="errors-container">
                  <p className={errors.lastName ? 'visible' : 'invisible'}>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {errors.lastName}
                  </p>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Birthday:</label>
              <input
                type="date"
                name="birthday"
                value={formValues.birthday}
                onChange={handleChange}
                required
              />
            </div>
            <div className="errors-container">
              <p className={errors.birthday ? 'visible' : 'invisible'}>
                <FontAwesomeIcon icon={faCircleExclamation} /> {errors.birthday}
              </p>
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
}
export default SignUp;
