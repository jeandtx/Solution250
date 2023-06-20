import React from 'react'
import styles from './main-price-card.module.scss'
import 'font-awesome/css/font-awesome.min.css'

export interface MainPriceCardProps {
    type?: string;
    price?: string;
    options?: string[];
    placeholder?: string;
}

export const MainPriceCard = ({type, price, options, placeholder } : MainPriceCardProps) => {
    return(
        <div className={styles.container}>
            <div className={styles.banner}>Most popular</div>
            <div className={styles.type}>{type}</div>
            <div className={styles.priceContainer}>
                <div className={styles.price}>{price}</div>
                <div style={{userSelect:'none'}}>/month</div>
            </div>
            <div className={styles.optionContainer}>
                {options?.map((option, index) => {
                    return(
                        <div style={{display:'flex'}}>
                            <i className="fa fa-check" style={{color: "white"}}/>
                            <div key={index} className={styles.option}>{option}</div>
                        </div>
                    )
                })}
            </div>
            <button className={styles.button}>{placeholder}</button>
        </div>
    )
}