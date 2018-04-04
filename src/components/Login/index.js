import React from 'react';
import Link from '../Link';

import background from '../../shared/images/background.jpg';
import styles from './styles.css';

const Login = () => (
  <div className={styles.background} style={{ backgroundImage: background }}>
    {console.log(background)}
    <Link page={'http://google.fr'}>{'Link to google'}</Link>
  </div>
);

export default Login;
