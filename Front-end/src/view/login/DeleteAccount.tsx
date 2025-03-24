import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface LocationState {
  userId?: string;
}

const DeleteAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState(""); // Added state for user name
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state as LocationState;

  useEffect(() => {
    if (userId) {
      axios
        .get<User>(`http://localhost:3000/users/${userId}`)
        .then((response) => {
          const user = response.data;
          setEmail(user.email);
          setName(`${user.firstName} ${user.lastName}`); // Set the user's name
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to fetch user data.");
        });
    }
  }, [userId]);

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
      <p style={{ color: "red" }}>
        {
          <>
            You are about to delete the account of <strong>{name}</strong>. This
            action cannot be undone.
          </>
        }
      </p>{" "}
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
