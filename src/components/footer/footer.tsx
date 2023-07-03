import { H6 } from '@blueprintjs/core';
import styles from './footer.module.scss';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    
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
                    <Link to="/" className="nav-link">
                        <p>Product</p><br/>
                    </Link>
                    <Link to="/plans" className="nav-link">
                        <p>Pricing</p><br/>
                    </Link>
                    <Link to="/about" className="nav-link">
                        <p>Learn more</p>
                    </Link>
                    </div>
                    <div className={styles.item2}>
                    <Link to="/contact" className="nav-link">
                        <p>Contact us</p><br/>
                    </Link> 
                        <div className={styles.social}>
                        <a href="https://www.linkedin.com/in/solution250/"><img src="src/assets/linkedin.png" alt="linkedin" className={styles.social} /></a>

                        <a href="https://twitter.com/250Solution"><img src="src/assets/twitter.png" alt="twitter" className={styles.socialtwitter} /></a>
                        
                        
                        <a href="https://www.instagram.com/solution250.ig/"><img src="src/assets/instagram.png" alt="instagram" className={styles.social} /></a>
                        </div>  
                    </div>
                    <div className={styles.item3}>
                    <Link to="/privacy" >
                        <p>Privacy policy</p><br/>
                    </Link>
                        <p>Terms of use</p>
                    </div>
                    </div>
                    
                </div>
                <div className={styles.copyright}><p>© 2023 - ALL RIGHTS RESERVED - Solution 250</p></div>

            </footer>
        
        
        </div>
    );
};
