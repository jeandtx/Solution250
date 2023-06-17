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
                        <p><a href="/product">Product</a></p><br/>
                        <p><a href="/pricing">Pricing</a></p><br/>
                        <p><a href="/learn-more">Learn more</a></p>
                    </div>
                    <div className={styles.item2}>
                        <p><a href="/contact">Contact us</a></p><br/>
                        <div className={styles.social}>
                            <img src="src/assets/facebook.png" alt="facebook" className={styles.social} />
                            <img src="src/assets/twitter.png" alt="twitter" className={styles.socialtwitter} />
                            <img src="src/assets/instagram.png" alt="instagram" className={styles.social} />
                        </div>  
                    </div>
                    <div className={styles.item3}>
                        <p><a href="/privacy-policy">Privacy policy</a></p><br/>
                        <p><a href="/terms-of-use">Terms of use</a></p>
                    </div>
                    </div>
                    
                </div>
            </footer>
            <div className={styles.copyright}><p>© 2023 - ALL RIGHTS RESERVED - Solution 250</p></div>
        
        
        </div>
    );
};
