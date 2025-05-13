import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './styles/global.scss';
import Index from './components/Index';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Home from './components/Home';
import RedirectRoute from './components/RedirectRoute';
import { homePath, loginPath, rootPath } from './constants/routes';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path={rootPath}
          element={
            <RedirectRoute shouldRedirect={isAuthenticated} redirectPath={homePath}>
              <Index />
            </RedirectRoute>
          }
        />
        <Route
          path={loginPath}
          element={
            <RedirectRoute shouldRedirect={isAuthenticated} redirectPath={homePath}>
              <Login />
            </RedirectRoute>
          }
        />
        <Route
          path={homePath}
          element={
            <RedirectRoute shouldRedirect={!isAuthenticated} redirectPath={rootPath}>
              <Home />
            </RedirectRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
