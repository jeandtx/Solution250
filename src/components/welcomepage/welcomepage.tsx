import React, { useState, useEffect } from 'react'
import styles from './welcomepage.module.scss'
import { NavBar } from '../navbar/navbar'

export const WelcomePage = () => {
    const [clicked, setClicked] = useState(false)

    return(
        <div>
            {
                !clicked ?
                <>
                    <div className={styles.text}>Click on the logo</div>
                    <div className={styles.container}
                    onClick={() => setClicked(true)}>
                        <div className={styles.logoContainer} >
                            <img className={styles.logo} src="src/assets/logo.png" alt="logo" />
                        </div>
                    </div>
                </>


                :
                <NavBar text="this will be the menu bar" />
            }
        </div>
    )
}