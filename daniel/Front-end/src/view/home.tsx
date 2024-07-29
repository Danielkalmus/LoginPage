import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowButton from "./components/ArrowButton";

interface LocationState {
  firstName: string;
  lastName: string;
  id: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, id } = location.state as LocationState;

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/my-177.png"
        alt="user"
      />
      <h1>Home page</h1>
      <h2>Welcome, {firstName} {lastName}!</h2>
      <button onClick={() => navigate("/RegisterOrUpdate", { state: { firstName, lastName, id } })}>Update User</button><br />
      <button onClick={() => navigate("/DeleteAccount", { state: { firstName, lastName, id } })}>Delete Account</button><br />
      <button onClick={() => navigate("/")}>Log Out</button>
    </div>
  );
}

export default Home;
