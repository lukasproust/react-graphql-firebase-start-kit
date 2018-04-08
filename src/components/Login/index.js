import React from 'react';

import Link from 'components/Link';

import Form from './Form';

import styles from './styles.css';

const Login = () => (
  <div className={styles.background}>
    <div className={styles.container}>
      <Link className={styles.link} page={'http://google.fr'} />
      <Form />
    </div>
  </div>
);

export default Login;
