import { useAuthStore } from 'store/authStore';

import { formatDate } from 'utils/formatting';

import styles from 'pages/HomePage.module.scss';

const WelcomeMessage = () => {
  const { firstName, loginDate } = useAuthStore();

  return (
    <>
      <div className={styles['home-text']}>Welcome, {firstName ?? 'Guest'}</div>
      <div className={styles['home-text']}>
        Last time you logged in was: {formatDate(loginDate)}
      </div>
    </>
  );
};

export default WelcomeMessage;
