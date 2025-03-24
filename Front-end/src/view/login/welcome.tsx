import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/user-name-25.png" alt="" />
      <h1>Welcome</h1>
      <button onClick={() => navigate("/login")}>LogIn</button>
      <br />
      <button onClick={() => navigate("/RegisterOrUpdate")}>Register</button>
      <br />
      <button onClick={() => navigate("/tables")}>Information Tables</button>
    </div>
  );
}

export default Welcome;
