import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log("Logging in with:", response.data);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found or password incorrect. Please try again.");
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("User not found or password incorrect. Please try again.");
      } else {
        setErrorMessage("Error logging in");
      }
      console.error(error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleLogin}>LogIn</button>
      {errorMessage && (
        <div>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <button onClick={handleRegisterRedirect}>Don't have an account? Register</button>
        </div>
      )}
    </div>
  );
}

export default Login;
