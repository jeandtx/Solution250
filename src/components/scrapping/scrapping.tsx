import React, { useEffect } from 'react';
import styles from './scrapping.module.scss';
import axios from 'axios';
import TagsInput from '../../components/tags-input/tags-input';

const ExtractASIN = (text: string) => {
    let ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
    let cMatch = RegExp(ASINreg).exec(text);
    if (cMatch == null) {
        console.log('No ASIN found');
        return null;
    }
    return cMatch[1];
};

const getLabels = async (data: any) => {
    const response = await fetch(
        // 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
        'https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli',
        {
            headers: {
                Authorization: 'Bearer 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',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
};

const getEmotion = async (data: any) => {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
        {
            headers: {
                Authorization: 'Bearer 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',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
};

interface ScrappingProps {
    text: any;
    labels: any;
}

export const Scrapping = ({ text, labels }: ScrappingProps) => {
    const [output, setOutput] = React.useState([]);
    const [result, setResult] = React.useState<any>(null);
    const [buttonClicked, setButtonClicked] = React.useState<boolean>(false);

    const scrapp = async () => {
        const params = {
            api_key: '6BFB1D719BBF42F2800C4F7E007B17D2',
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
                setOutput(out);
                console.log(out);
                return out;
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const analyze = async (out: any) => {
        const result: any = {};

        for (let i = 0; i < out.length; i++) {
            try {
                const emotionResult = await getEmotion(out[i]);
                const labelResult = await getLabels({
                    inputs: out[i],
                    parameters: { candidate_labels: labels },
                });

                result[i] = {
                    review: out[i],
                    emotion: emotionResult,
                    labels: labelResult,
                };
            } catch (error) {
                console.log('Error occurred:', error);
            }
        }
        console.log(result);
        const transformed_result = Object.values(result).map((item: any) => {
            const review = item.review;
            const firstSentiment = item.emotion[0][0].label;
            const firstLabel = item.labels.labels[0];

            return { review, firstSentiment, firstLabel };
        });
        setResult(transformed_result);
        console.log('Result:', transformed_result);
    };

    const handleSubmit = () => {
        analyze(output);
        setButtonClicked(true);
    };

    useEffect(() => {
        analyze(scrapp());
    }, []);

    return (
        <div>
            {result ? (
                <div className={styles.pro}>
                    <h1>List of reviews</h1>
                    <button
                        className={styles.button}
                        onClick={handleSubmit}
                        disabled={buttonClicked}
                    >
                        Analyze !
                    </button>
                    <table className={styles.table}>
                        <tbody>
                            <tr className={styles.tableHead}>
                                <th>Index</th>
                                <th>Review</th>
                                <th>Emotion</th>
                                <th>Labels</th>
                            </tr>
                            {result.map((element: any, index: number) => (
                                <tr key={index} className={styles.tableRow}>
                                    <td>{index + 1}</td>
                                    <td>{element.review}</td>
                                    <td>
                                        <p>{element.firstSentiment}</p>
                                    </td>
                                    <td>{element.firstLabel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={styles.pro}>
                    We encountered an error, please try again
                </div>
            )}
        </div>
    );
};
