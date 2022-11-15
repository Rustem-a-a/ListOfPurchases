import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}><FontAwesomeIcon icon={faCartShopping}/></div>
            <h1 className={styles.text}>Welcome to shopping list</h1>
        </div>
    );
};

export default Header;