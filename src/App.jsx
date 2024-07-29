import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AddEvent from "./components/AddEvent";

function App() {
  return (
    
<GoogleOAuthProvider clientId="119124985369-h9qu4b3357qsond61kqh8dqn03jfn75q.apps.googleusercontent.com">
    <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/addEvent" element={ <AddEvent />}></Route>
    </Routes>
  </Router>
  </GoogleOAuthProvider>
  );
}

export default App
