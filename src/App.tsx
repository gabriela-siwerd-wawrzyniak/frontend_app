import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/welcome" /> : <Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/welcome" /> : <Login />} />
        <Route
          path="/welcome"
          element={isAuthenticated ? <Welcome /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
