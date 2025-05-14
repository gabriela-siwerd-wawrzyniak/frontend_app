import { rootPath } from 'constants/routes';

import { useNavigate } from 'react-router';
import { useAuthStore } from 'store/authStore';

import PostsList from "components/posts/PostsList";
import WelcomeMessage from "components/WelcomeMessage";

import styles from 'pages/HomePage.module.scss';


const HomePage = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate(rootPath);
  };

  return (
    <main>
      <header className={styles['header']}>
        <h1>Home Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <section className={styles['home-container']}>
        <WelcomeMessage />
        <PostsList />
      </section>
    </main>
  );
};

export default HomePage;
