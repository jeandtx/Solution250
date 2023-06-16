import { H6 } from '@blueprintjs/core';
import styles from './footer.module.scss';
import { useState } from 'react';

export const Footer = () => {
    

    return (
        <div className={styles.menu}>
            <footer className={styles.footer}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <img src="src/assets/logo.png" alt="logo" className={styles.logo} />
                    </div>
                    <div className={styles.item}>
                    <div className={styles.item1}>
                        <p>product</p><br/>
                        <p>pricing</p><br/>
                        <p>learn more</p>
                    </div>
                    <div className={styles.item2}>
                        <p>contact us</p><br/>
                        <div className={styles.social}>
                            <img src="src/assets/facebook.png" alt="facebook" className={styles.social} />
                            <img src="src/assets/twitter.png" alt="twitter" className={styles.social} />
                            <img src="src/assets/instagram.png" alt="instagram" className={styles.social} />
                        </div>  
                    </div>
                    <div className={styles.item3}>
                        <p>privacy policy</p><br/>
                        <p>term of use</p>
                    </div>
                    </div>
                    
                </div>
            </footer>
            <div className={styles.copyright}><p>© 2023 - ALL RIGHTS RESERVED - Solution 250</p></div>
        
        
        </div>
    );
};
