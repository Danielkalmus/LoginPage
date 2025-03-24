import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowButton from "./components/ArrowButton";

const Tables: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/utility/table-38.png"
        alt=""
      />
      <h1>Information Tables</h1>
      <button onClick={() => navigate("/companies")}>Show Companies</button>
      <br />
      <button onClick={() => navigate("/users")}>Show Users</button>
    </div>
  );
};

export default Tables;
