import React from 'react';
import styles from './scrapping.module.scss';
import axios from 'axios';

export const Scrapping: React.FC = () => {
    const [text, setText] = React.useState('');

    const scrapp = async () => {
        const params = {
            api_key: 'D2132ABBBBF04A878B19738F53749EED',
            amazon_domain: 'amazon.com',
            type: 'reviews',
            asin: text,
        };

        axios
            .get('https://api.asindataapi.com/request', { params })
            .then((response: any) => {
                let out: any = [];
                response = response.data.reviews;
                for (const element of response) {
                    out.push(element.body.toString());
                }
                setText(out.join('\n'));
            })
            .catch((error: any) => {
                // catch and print the error
                console.log(error);
            });
    };

    return (
        <div className={styles.pro}>
            <h1>Enter an Amazon product</h1>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textInput}
            />
            <button
                className={styles.button}
                onClick={() => {
                    scrapp();
                }}
            >
                Search !
            </button>
        </div>
    );
};
