import React from 'react';
import styles from './scrapping.module.scss';
import axios from 'axios';

const ExtractASIN = (text: string) => {
    let ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
    let cMatch = RegExp(ASINreg).exec(text);
    if (cMatch == null) {
        console.log('No ASIN found');
        return null;
    }
    return cMatch[1];
};
export const Scrapping: React.FC = () => {
    const [text, setText] = React.useState('');

    const scrapp = async () => {
        const params = {
            api_key: 'D2132ABBBBF04A878B19738F53749EED',
            amazon_domain: 'amazon.com',
            type: 'reviews',
            asin: ExtractASIN(text),
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
