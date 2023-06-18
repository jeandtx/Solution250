import React from 'react'
import styles from './price-card.module.scss'
import 'font-awesome/css/font-awesome.min.css'

export interface PriceCardProps {
    type?: string;
    price?: string;
    placeholder?: string;
    options?: string[];
}

export const PriceCard = ({type, price, placeholder, options } : PriceCardProps) => {

    return(
        <div className={styles.container}>
            <div className={styles.type}>{type}</div>
            <div className={styles.price}>{price}</div>
            <div className={styles.optionContainer}>
                {options?.map((option, index) => {
                    return(
                        <div style={{display:'flex'}}>
                            <i className="fa fa-check" style={{color: "#25338d"}}/>
                            <div key={index} className={styles.option}>{option}</div>
                        </div>
                    )
                })}
            </div>
            <button className={styles.button}>{placeholder}</button>
        </div>
    )
}