import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowButton from "./components/ArrowButton";

interface LocationState {
  userId: number;
  firstName: string;
  lastName: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, lastName, firstName } = location.state as LocationState;

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/my-177.png"
        alt="user"
      />
      <h1>Home page</h1>
      <h2>
        Welcome, {firstName} {lastName}!
      </h2>
      <button
        onClick={() =>
          navigate("/RegisterOrUpdate", {
            state: { firstName, lastName, userId, mode: "update" },
          })
        }
      >
        Update User
      </button>
      <br />
      <button
        onClick={() =>
          navigate("/DeleteAccount", { state: { firstName, lastName, userId } })
        }
      >
        Delete Account
      </button>
      <br />
      <button onClick={() => navigate("/")}>Log Out</button>
    </div>
  );
};

export default Home;
