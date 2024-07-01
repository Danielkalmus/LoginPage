import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home page</h1>
      <h2>You successfully signed in</h2>
      <button onClick={() => navigate("/")}>LogOut</button>
    </div>
  );
}

export default Home;
