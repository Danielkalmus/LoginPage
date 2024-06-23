import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const goBack = () => {
    navigate("/");
  }

  const showUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      console.log("Response data:", response.data);

      if (Array.isArray(response.data.result)) {
        setUsers(response.data.result);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error(error);
      setError("Error showing users");
    }
  };

  useEffect(() => {
    showUsers();
  }, []);

  return (
    <div>
        <button onClick={goBack}>Go back</button>
      {error && <p>{error}</p>}
      <ul>
        <h3>Users ID</h3>
        {users.map((user) => (
          <li key={user.ID}>{user.ID}</li>
        ))}
      </ul>
      <ul>
        <h3>Users Email</h3>
        {users.map((user) => (
          <li key={user.ID}>{user.email}</li>
        ))}
      </ul>
      <ul>
        <h3>Users Password</h3>
        {users.map((user) => (
          <li key={user.ID}>{user.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
