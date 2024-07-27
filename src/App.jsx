import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
    </Routes>
  </Router>
  );
}

export default App
