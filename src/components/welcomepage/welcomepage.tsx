import React, { useState } from 'react';
import styles from './welcomepage.module.scss';
import { NavBar } from '../navbar/navbar';
import { TextInput } from '../text-input/text-input';

export const WelcomePage = () => {
    const [clicked, setClicked] = useState(false);
    const [animation, setAnimation] = useState(false);

    const handleClick = () => {
        setAnimation(true);
        setTimeout(() => {
            setClicked(true);
        }, 800);
    };

    return (
        <div>
            {!clicked ? (
                <div>
                    <div
                        className={`${styles.text} ${
                            animation ? '' : styles.textBreath
                        }`}
                    >
                        Click on the logo
                    </div>
                    <div
                        className={`${styles.container} ${
                            animation ? styles.fadeAnimation : ''
                        }`}
                        onClick={handleClick}
                    >
                        <div className={styles.logoContainer}>
                            <div className={styles.infiniteRotate}>
                                <img
                                    className={`${styles.logo} ${
                                        animation
                                            ? styles.zoomFadeAnimation
                                            : ''
                                    }`}
                                    src="src/assets/logo.png"
                                    alt="logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <NavBar />
                    <TextInput />
                </>
            )}
        </div>
    );
};
