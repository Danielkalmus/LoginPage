import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Home page</h1>
      <h2>you successfully signed in</h2>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
}

export default Home;
