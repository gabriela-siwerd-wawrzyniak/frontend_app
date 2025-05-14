import { loginPath } from 'constants/routes';

import { useNavigate } from 'react-router';

const MainButton = () => {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(loginPath)}>
      Go to login page
    </button>
  );
};

export default MainButton;
