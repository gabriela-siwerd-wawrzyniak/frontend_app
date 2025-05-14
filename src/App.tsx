import { homePath, loginPath, rootPath } from 'constants/routes';

import RedirectRoute from 'components/routes/RedirectRoute';
import HomePage from 'pages/HomePage';
import IndexPage from 'pages/IndexPage';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { useAuthStore } from 'store/authStore';

import 'styles/global.scss';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path={rootPath}
          element={
            <RedirectRoute shouldRedirect={isAuthenticated} redirectPath={homePath}>
              <IndexPage />
            </RedirectRoute>
          }
        />
        <Route
          path={loginPath}
          element={
            <RedirectRoute shouldRedirect={isAuthenticated} redirectPath={homePath}>
              <LoginPage />
            </RedirectRoute>
          }
        />
        <Route
          path={homePath}
          element={
            <RedirectRoute shouldRedirect={!isAuthenticated} redirectPath={rootPath}>
              <HomePage />
            </RedirectRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
