import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./view/login/login";
import Home from "./view/home";
import Welcome from "./view/login/welcome";
import Users from "./view/users";
import Register from "./view/login/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
