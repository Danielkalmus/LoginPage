import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreation = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/register", { email, password });
      navigate("/");
    } catch (error) {
      setError(error.response ? error.response.data : "Error creating account");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreation}>
        <input
          placeholder="New Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <input
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}
        <br />
        <input
          placeholder="Verify New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />{" "}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
