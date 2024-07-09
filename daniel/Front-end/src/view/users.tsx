import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowButton from "./components/ArrowButton";
import { format } from "date-fns";

interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchedEmail, setSearchedEmail] = useState<string>("");
  const [sortByYoungToOld, setSortByYoungToOld] = useState<boolean>(false);
  const [sortByOldToYoung, setSortByOldToYoung] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ result: User[] }>("http://localhost:3000/users");
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

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSortYoungToOld = (): void => {
    setSortByYoungToOld((prevSortByYoungToOld) => !prevSortByYoungToOld);
    if (sortByOldToYoung) setSortByOldToYoung(false);
  };

  const handleSortOldToYoung = (): void => {
    setSortByOldToYoung((prevSortByOldToYoung) => !prevSortByOldToYoung);
    if (sortByYoungToOld) setSortByYoungToOld(false);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchedEmail.toLowerCase())
  );

  const sortedUsers = sortByYoungToOld
    ? [...filteredUsers].sort((a, b) => {
        const ageA = calculateAge(a.dateOfBirth);
        const ageB = calculateAge(b.dateOfBirth);
        return ageA - ageB;
      })
    : sortByOldToYoung
    ? [...filteredUsers].sort((a, b) => {
        const ageA = calculateAge(a.dateOfBirth);
        const ageB = calculateAge(b.dateOfBirth);
        return ageB - ageA;
      })
    : filteredUsers;

  return (
    <div>
      <ArrowButton />
      {error && <p>{error}</p>}
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/personal-information-13.png"
        alt="users"
      />
      <h2>Users List</h2>
      <input
        type="text"
        placeholder="🔍Search"
        value={searchedEmail}
        onChange={(e) => setSearchedEmail(e.target.value)}
        required
      />
      <div>
        <button onClick={handleSortYoungToOld} disabled={sortByOldToYoung}>
          {sortByYoungToOld ? "Unsort Young to Old" : "Sort Young to Old"}
        </button>
        <button onClick={handleSortOldToYoung} disabled={sortByYoungToOld}>
          {sortByOldToYoung ? "Unsort Old to Young" : "Sort Old to Young"}
        </button>
      </div>
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
          {sortedUsers.map((user) => (
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
};

export default Users;
