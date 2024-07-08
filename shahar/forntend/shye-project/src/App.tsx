import './App.css'
import Login from './view/pages/login/login'
import { Route, Routes } from 'react-router-dom';
import Home from './view/pages/home/home'
import SignUp from './view/pages/signup/signUp';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path='/home' element={<Home/>} />
  </Routes>
  );
}

export default App;