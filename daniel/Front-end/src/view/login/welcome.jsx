import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const showUsers = () => {
    navigate("/users");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleLogin}>LogIn</button>
      <br />
      <button onClick={handleRegister}>Register</button>
      <br />
      <button onClick={showUsers}>show users details</button>
    </div>
  );
}

export default Welcome;
