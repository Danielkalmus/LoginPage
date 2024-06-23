import './App.css'
import Login from './login';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import SignUp from './signUp';

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