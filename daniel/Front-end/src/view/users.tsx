import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowButton from "./components/ArrowButton";
import { format } from "date-fns";
import { GenerateRandomUsers } from "./generateUsers";
import EllipsisMenu from "./login/EllipsisMenu";

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  company?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchedEmail, setSearchedEmail] = useState<string>("");
  const [sortByYoungToOld, setSortByYoungToOld] = useState<boolean>(false);
  const [sortByOldToYoung, setSortByOldToYoung] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfUsers, setNumberOfUsers] = useState<number>();
  const usersPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ result: User[] }>(
          "http://localhost:3000/users"
        );
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

  const handleSortYoungToOld = (): void => {
    setSortByYoungToOld((prevSortByYoungToOld) => !prevSortByYoungToOld);
    if (sortByOldToYoung) setSortByOldToYoung(false);
  };

  const handleSortOldToYoung = (): void => {
    setSortByOldToYoung((prevSortByOldToYoung) => !prevSortByOldToYoung);
    if (sortByYoungToOld) setSortByYoungToOld(false);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchedEmail.toLowerCase())
  );

  const sortedUsers = sortByYoungToOld
    ? [...filteredUsers].sort(
        (a, b) =>
          new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime()
      )
    : sortByOldToYoung
    ? [...filteredUsers].sort(
        (a, b) =>
          new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime()
      )
    : filteredUsers;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleGenerateUsers = async () => {
    const users = numberOfUsers ? GenerateRandomUsers(numberOfUsers) : [];
    try {
      await axios.post("http://localhost:3000/UsersGenerator", users);
      alert(numberOfUsers + " users created successfully");
      window.location.reload();
    } catch (error: any) {
      setError(
        error.response?.data || "An error occurred during bulk registration"
      );
    }
  };

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
        placeholder="Number of users"
        type="number"
        value={numberOfUsers}
        onChange={(e) => setNumberOfUsers(parseInt(e.target.value))}
        required
      />
      <button onClick={handleGenerateUsers}>
        Generate {numberOfUsers} Users
      </button>
      <br />
      <input
        type="text"
        placeholder="🔍Search"
        value={searchedEmail}
        onChange={(e) => setSearchedEmail(e.target.value)}
        required
      />
      <div>
        <button onClick={handleSortYoungToOld} disabled={sortByOldToYoung}>
          {sortByYoungToOld ? "Unsort Old to Young" : "Sort Old to Young"}
        </button>
        <button onClick={handleSortOldToYoung} disabled={sortByYoungToOld}>
          {sortByOldToYoung ? "Unsort Young to Old" : "Sort Young to Old"}
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
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{format(new Date(user.dateOfBirth), "dd/MM/yyyy")}</td>
              <td>{user.company}</td>
              <td><EllipsisMenu userId={user.id} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;