import './App.css'
import Dashboard from './signUp';
import Login from './login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard/>} />
  </Routes>
  );
}

export default App;