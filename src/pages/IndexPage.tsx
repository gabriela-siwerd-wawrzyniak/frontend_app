import MainButton from 'components/MainButton';

import styles from 'pages/IndexPage.module.scss';

const IndexPage = () => (
  <>
    <header className={styles.header}>
      <h1>Login App</h1>
    </header>
    <section className={styles.content}>
      <MainButton />
    </section>
  </>
);

export default IndexPage;
