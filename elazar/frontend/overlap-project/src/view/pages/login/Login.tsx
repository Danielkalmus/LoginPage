import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";
import { baseUrl } from "../../../const";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function CorrectPassword(password: string): boolean {
  return password.length >= 6;
}

function CorrectEmail(email: string): boolean {
  return email.includes("@") && email.includes('.')
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleWelcome = async () => {
    if (CorrectEmail(email) && CorrectPassword(password)) {
      handleLogin();
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getUser`, {
        params: { email, password }
      });
      const name = response.data.name;
      setMessage(response.data);
      navigate('/Welcome', { state: { name, email } })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  const handleUsersTable = () => {
    navigate("/UsersTable")
  }


  const inputValid = email.includes("@") && email.includes('.') && password.length >= 6;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <div>
        Email:
          <input
            placeholder="email@example.com"
            name="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            placeholder="Password"
            name="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{errorMessage}</p>
        </div>
        <div>
          <button type="submit" className={`login-button ${inputValid ? "valid":""}`} disabled={!inputValid} onClick={handleWelcome}>Login</button>
          {message && <p><FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#d15329",}} />{" " + message}</p>}
        </div>
      </div>
      <div className="create-account">
        Don't have an account? <NavLink className="link-create-account" to="/createAccount">Create account</NavLink>
      </div>
      <div className="see-all-users">
        <button onClick={handleUsersTable}>See all users</button>
      </div>
    </div>
  );
}

export default Login;



