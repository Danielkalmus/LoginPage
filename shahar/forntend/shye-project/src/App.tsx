import './App.css'
import Login from './view/pages/login/login'
import { Route, Routes } from 'react-router-dom';
import Home from './view/pages/home/home'
import SignUp from './view/pages/signup/signUp';
import Settings from './view/pages/home/accountSettings';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/home/settings' element={<Settings/>} />
  </Routes>
  );
}

export default App;