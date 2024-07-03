import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowButton from "./components/ArrowButton";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, id } = location.state;

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/my-177.png"
        alt="user"
      />
      <h1>Home page</h1>
      <h2>Welcome, {firstName} {lastName}!</h2>
      <button onClick={() => navigate("/changePassword", { state: { firstName, lastName, id } })}>Change Password</button><br />
      <button onClick={() => navigate("/")}>Log Out</button>
    </div>
  );
}

export default Home;
