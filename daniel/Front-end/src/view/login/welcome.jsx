import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <img src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/user-name-25.png" alt="" />
      <h1>Welcome</h1>
      <button onClick={() => navigate("/login")}>LogIn</button>
      <br />
      <button onClick={() => navigate("/register")}>Register</button>
      <br />
      <button onClick={() => navigate("/users")}>Show Users</button>
    </div>
  );
}

export default Welcome;
