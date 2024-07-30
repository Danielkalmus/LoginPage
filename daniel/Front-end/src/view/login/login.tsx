import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";

interface LoginResponse {
  userId: number;
  firstName: string;
  lastName: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/login",
        {
          email,
          password,
        }
      );

      const { userId, firstName, lastName } = response.data;
      navigate("/home", { state: { firstName, lastName, userId } });
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        setErrorMessage(
          "User not found or password incorrect. Please try again."
        );
      } else {
        setErrorMessage("Error logging in");
      }
    }
  };

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/password-143.png"
        alt="lock"
      />
      <h2>Login Page</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />{" "}
      <br />
      <button onClick={handleLogin}>Log In</button> <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} <br />
      <a onClick={() => navigate("/RegisterOrUpdate")}>
        Don't have an account? Register
      </a>
    </div>
  );
};

export default Login;
