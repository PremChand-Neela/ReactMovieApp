import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to='/'>Movie App</Link>
      </div>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/favorites" className={styles.navLink}>Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;
