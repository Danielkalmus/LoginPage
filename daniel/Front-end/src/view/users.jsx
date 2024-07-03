import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowButton from "../view/components/ArrowButton";
import { format } from "date-fns";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        if (Array.isArray(response.data.result)) {
          setUsers(response.data.result);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        setError("Error showing users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <ArrowButton />
      {error && <p>{error}</p>}
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/personal-information-13.png"
        alt="users"
      />
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{format(new Date(user.dateOfBirth), "dd/MM/yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
