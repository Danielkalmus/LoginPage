import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./view/pages/login/Login";
import CreateAccount from "./view/pages/create_account/CreateAccount";
import Welcome from "./view/pages/home/Welcome";
import UsersTable from "./view/pages/usersDisplay/UsersTable";
import EditOrDeleteAccount from "./view/pages/EditAccount/EditOrDeleteAccount";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Welcome" element={<Welcome/>}/>
      <Route path="/createAccount" element={<CreateAccount/>}/> 
      <Route path="/EditOrDeleteAccount" element={<EditOrDeleteAccount/>}/>
      <Route path="/UsersTable" element={<UsersTable/>}/>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
