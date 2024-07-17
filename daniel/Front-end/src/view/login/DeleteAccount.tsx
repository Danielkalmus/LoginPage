import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";

const DeleteAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await axios.post("http://localhost:3000/delete-account", {
        email,
        password,
      });
      alert("Account deleted successfully");
      navigate("/"); // Redirect to home page or login page after deletion
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Error deleting account");
      }
    }
  };

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/delete-448.png"
        alt="Delete"
      />
      <h2>Delete Account</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default DeleteAccount;
