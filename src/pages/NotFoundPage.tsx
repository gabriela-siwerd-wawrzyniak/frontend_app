import { homePath } from 'constants/routes';

import { useNavigate } from 'react-router';

import styles from 'pages/IndexPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <header className={styles['header']}>
        <h1>Page Not Found</h1>
        <button onClick={() => navigate(homePath)}>Home</button>
      </header>
      <section>
        <h2>The page you are looking for does not exist.</h2>
      </section>
    </main>
  );
};

export default NotFoundPage;
