import { H6 } from '@blueprintjs/core';
import styles from './navbar.module.scss';
import { useState } from 'react';

export interface NavBarProps {
    text?: string;
}

export const NavBar = ({ text }: NavBarProps) => {
    const [fadeItems, setFadeItems] = useState<string[]>([]);

    const handleItemClick = (item: string) => {
        setFadeItems([...fadeItems, item]);
        setTimeout(() => {
            setFadeItems(fadeItems.filter((i) => i !== item));
        }, 5000); // Adjust the delay to match the transition duration in milliseconds
    };

    return (
        <div className={styles.menu}>
            <div className={styles.left}>
                <div
                    className={`${styles.logo} ${
                        fadeItems.includes('logo') ? styles['fade-out'] : ''
                    }`}
                    onClick={() => handleItemClick('logo')}
                >
                    <img src="src/assets/logo.png" alt="logo" />
                </div>
                <div
                    className={`${styles.item} ${
                        fadeItems.includes('plans') ? styles['fade-out'] : ''
                    }`}
                    onClick={() => handleItemClick('plans')}
                >
                    <H6>Plans</H6>
                </div>
                <div
                    className={`${styles.item} ${
                        fadeItems.includes('about') ? styles['fade-out'] : ''
                    }`}
                    onClick={() => handleItemClick('about')}
                >
                    <H6>About us</H6>
                </div>
            </div>
            <div className={styles.right}>
                <div
                    className={`${styles.item} ${
                        fadeItems.includes('login') ? styles['fade-out'] : ''
                    }`}
                    onClick={() => handleItemClick('login')}
                >
                    <H6>Login</H6>
                </div>
            </div>
        </div>
    );
};
