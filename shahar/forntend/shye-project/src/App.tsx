import './App.css'
import Dashboard from './signUp';
import Login from './login';
import { Route, Routes } from 'react-router-dom';
import Home from './home';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signUp" element={<Dashboard/>} />
    <Route path='/home' element={<Home/>} />
  </Routes>
  );
}

export default App;