import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Welcome from './components/Welcome';
import { homePath, loginPath, rootPath } from './constants/routes';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path={rootPath} element={isAuthenticated ? <Navigate to={homePath} /> : <Home />} />
        <Route path={loginPath} element={isAuthenticated ? <Navigate to={homePath} /> : <Login />} />
        <Route
          path={homePath}
          element={isAuthenticated ? <Welcome /> : <Navigate to={rootPath} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
