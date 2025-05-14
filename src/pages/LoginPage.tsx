import LoginForm from 'components/forms/LoginForm';

import styles from 'pages/LoginPage.module.scss';

const LoginPage = () => (
  <main>
    <header className={styles.header}>
      <h1>Login Page</h1>
    </header>
    <section className={styles['login-container']}>
      <LoginForm />
    </section>
  </main>
);

export default LoginPage;
