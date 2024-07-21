import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import 'react-datepicker/dist/react-datepicker.css';
import "./CreateAccount.css";
import axios from "axios";
import { baseUrl } from "../../../const";

interface BooleanArray {
  firstNameValid: boolean;
  LastNameValid: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
  ageValid: boolean;
}

const booleanArray: BooleanArray = {
  firstNameValid: false,
  LastNameValid: false,
  emailValid: false,
  passwordValid: false,
  confirmPasswordValid: false,
  ageValid: false,
};

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
};

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [FirstNameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [lastName, setLastName] = useState("");
  const [LastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const [email, setEmail] = useState("");
  const [EmailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState("");
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [age, setAge] = useState<string>('');
  const [AgeErrorMessage, setAgeErrorMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstName = e.target.value;
    setFirstName(newFirstName);

    if ((/[\u0590-\u05FF]/).test(newFirstName) || newFirstName === '') {
      booleanArray.firstNameValid = newFirstName !== ''
      setFirstNameErrorMessage('');

    } else {
      booleanArray.firstNameValid = false
      setFirstNameErrorMessage('Name must be in hebrew');
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = e.target.value;
    setLastName(newLastName);

    if ((/[\u0590-\u05FF]/).test(newLastName) || newLastName === '') {
      booleanArray.LastNameValid = newLastName !== ''
      setLastNameErrorMessage('');
    } else {
      booleanArray.LastNameValid = false
      setLastNameErrorMessage('Name must be in hebrew');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if ((newEmail.includes("@") && newEmail.includes('.')) || newEmail === '') {
      booleanArray.emailValid = newEmail !== ''
      setEmailErrorMessage('');
    } else {
      booleanArray.emailValid = false
      setEmailErrorMessage('Email must be contain . and @');
    }
  };



  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6 && newPassword !== '') {
      booleanArray.passwordValid = false
      setPasswordErrorMessage('Password must be at least 6 characters long');
    } else {
      booleanArray.passwordValid = newPassword !== ''
      setPasswordErrorMessage('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword != password && newConfirmPassword !== '') {
      booleanArray.confirmPasswordValid = false
      setConfirmPasswordErrorMessage('Not mach to password');
    } else {
      booleanArray.confirmPasswordValid = newConfirmPassword !== ''
      setConfirmPasswordErrorMessage('');
    }
  };

  const calculateDateDifference = (date: string): number => {
    console.log('Date input (before conversion):', date);

    const [year, month, day] = date.split('-').map(Number);
    const givenDate = new Date(year, month - 1, day);

    givenDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeDifference = today.getTime() - givenDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24)) / 365;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setAge(e.target.value);
    if (calculateDateDifference(newDate) < 10 && newDate !== '') {
      booleanArray.ageValid = false
      setAgeErrorMessage('Age must be 10 minimum');
    } else {
      booleanArray.ageValid = newDate !== ''
      setAgeErrorMessage('');
    }
  };

  const allTrue = Object.values(booleanArray).every(value => value === true);

  const handleWelcome = () => {
    if (allTrue) {
      //booleanArray.firstNameValid = false
      handleSubmit();
    }
    else {
      setErrorMessage("One or more of the values you entered are incorrect")
    }
  };

  const handleSubmit = async () => {
    const newUser:User = { firstName, lastName, age, email, password };
    try {
      const result = await axios.post(`${baseUrl}/createUser`, newUser);
      setErrorMessage(result.data);
      navigate("/")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="create-account-container">
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          placeholder="ישראל"
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        {FirstNameErrorMessage && <p style={{ color: 'red' }}>{FirstNameErrorMessage}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          placeholder="ישראלי"
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
        {LastNameErrorMessage && <p style={{ color: 'red' }}>{LastNameErrorMessage}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          placeholder="Select your birth date"
          type="date"
          name="age"
          id="age"
          value={age}
          onChange={handleDateChange}
        />
        {AgeErrorMessage && <p style={{ color: 'red' }}>{AgeErrorMessage}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="email@example.com"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        {EmailErrorMessage && <p style={{ color: 'red' }}>{EmailErrorMessage}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="password"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {PasswordErrorMessage && <p style={{ color: 'red' }}>{PasswordErrorMessage}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          placeholder="password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {ConfirmPasswordErrorMessage && <p style={{ color: 'red' }}>{ConfirmPasswordErrorMessage}</p>}
      </div>
      <button type="submit" onClick={handleWelcome}>Create Account</button>
      <p>{errorMessage}</p>
      <div className="login-redirect">
        Already have an account? <NavLink className="link-login" to="/">Login</NavLink>
      </div>
    </div>
  );
};

export default CreateAccount;
