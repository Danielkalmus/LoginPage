import './App.css'
import Login from './view/pages/login/login'
import { Route, Routes } from 'react-router-dom';
import Home from './view/pages/home/home'
import SignUp from './view/pages/signup/signUp';
import Settings from './view/pages/settings/accountSettings';
import UsersPage from './view/pages/users/usersTable';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/home/settings' element={<Settings/>} />
    <Route path='/home/users' element={<UsersPage/>} />
  </Routes>
  );
}

export default App;