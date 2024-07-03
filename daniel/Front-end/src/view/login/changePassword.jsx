import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, id } = location.state;

  const handleChange = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length > 6) {
      setError("Password must be max 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/changePassword", {
        userId: id,
        oldPassword,
        newPassword,
      });
      navigate("/home", { state: { firstName, lastName, id } });
    } catch (error) {
      setError(
        error.response ? error.response.data : "Error changing password"
      );
    }
  };

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/change-password-18.png"
        alt=""
      />
      <h2>Change Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleChange}>
        <br />
        <input
          placeholder="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Verify New Password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ChangePassword;
