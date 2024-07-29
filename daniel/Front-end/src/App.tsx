import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./view/login/login";
import Home from "./view/home";
import Welcome from "./view/login/welcome";
import Users from "./view/users";
import RegisterOrUpdate from "./view/login/RegisterOrUpdate";
import DeleteAccount from "./view/login/DeleteAccount";
import Tables from "./view/tables";
import Companies from "./view/companies";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/RegisterOrUpdate" element={<RegisterOrUpdate />} />
        <Route path="/DeleteAccount" element={<DeleteAccount />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
