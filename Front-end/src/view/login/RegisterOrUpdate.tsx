import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface LocationState {
  userId?: string;
  mode?: "register" | "update";
}

const RegisterOrUpdate: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>(""); // State for old password
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const { userId, mode = "register" } = (location.state as LocationState) || {};

  useEffect(() => {
    if (mode === "update" && userId) {
      axios
        .get<User>(`http://localhost:3000/users/${userId}`)
        .then((response) => {
          const user = response.data;
          setEmail(user.email);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setDateOfBirth(user.dateOfBirth);
        })
        .catch(() => {
          setError("Error fetching user data");
        });
    }
  }, [mode, userId]);

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!/^[א-ת]+$/.test(firstName)) {
      setFirstNameError("First name can only contain Hebrew letters");
      return;
    }

    if (!/^[א-ת]+$/.test(lastName)) {
      setLastNameError("Last name can only contain Hebrew letters");
      return;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length > 6) {
      setError("Password must be at most 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!dateOfBirth) {
      setError("Date of birth is required");
      return;
    }

    if (calculateAge(dateOfBirth) < 18) {
      setError("You must be at least 18 years old");
      return;
    }

    try {
      if (mode === "update") {
        if (!oldPassword) {
          setError("Old password is required for updates");
          return;
        }

        await axios.post("http://localhost:3000/updateUser", {
          userId: userId, // Ensure this is not undefined
          oldPassword: oldPassword,
          newPassword: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
        });
        navigate("/home", { state: { firstName, lastName, userId } });
      } else {
        await axios.post("http://localhost:3000/register", {
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
        });
        navigate("/");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Error processing request");
      }
    }
  };

  const validateFirstName = (name: string) => {
    if (!name) {
      setFirstNameError("");
    } else if (!/^[א-ת]+$/.test(name)) {
      setFirstNameError("First name can only contain Hebrew letters");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = (name: string) => {
    if (!name) {
      setLastNameError("");
    } else if (!/^[א-ת]+$/.test(name)) {
      setLastNameError("Last name can only contain Hebrew letters");
    } else {
      setLastNameError("");
    }
  };

  return (
    <div>
      <ArrowButton />
      <img
        src={
          mode === "update"
            ? "https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/account-management-18.png"
            : "https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/register-14.png"
        }
        alt="register"
      />
      <h2>{mode === "update" ? "Update User" : "Register"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateFirstName(e.target.value);
          }}
          required
        />
        {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
        <br />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateLastName(e.target.value);
          }}
          required
        />
        {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
        <br />
        <input
          placeholder="Date Of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        {mode === "update" && (
          <input
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        )}
        {mode === "update" && <br />}
        <input
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Verify New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">
          {mode === "update" ? "Update" : "Register"}
        </button>
      </form>
      {mode === "register" && (
        <div>
          <a onClick={() => navigate("/login")}>
            Already have an account? Login
          </a>
        </div>
      )}
    </div>
  );
};

export default RegisterOrUpdate;
