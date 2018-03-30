import React from 'react';
import Link from '../Link';

import styles from './styles.css';

const Login = () => (
  <div className={styles.container}>
    {'test'}
    <Link page={'http://google.fr'}>{'Link to google'}</Link>
  </div>
);

export default Login;
