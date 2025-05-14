import { Navigate } from 'react-router';

interface RedirectRouteProps {
  shouldRedirect: boolean;
  redirectPath: string;
  children: React.ReactElement;
}

const RedirectRoute = ({ shouldRedirect, redirectPath, children }: RedirectRouteProps) => {
  return shouldRedirect ? <Navigate to={redirectPath} replace /> : children;
};

export default RedirectRoute;
