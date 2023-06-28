import React from 'react';
import styles from './scrapping.module.scss';
import axios from 'axios';
import TagsInput from '../../components/tags-input/tags-input';

async function getEmotion(data: any) {
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
}

async function getLabels(data: any) {
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
}

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
    const [output, setOutput] = React.useState([]);
    const [labels, setLabels]: any = React.useState([
        'good',
        'bad',
        'expensive',
        'cheap',
        'clean',
        'dirty',
    ]);
    const [result, setResult] = React.useState<any>(null);

    const scrapp = async () => {
        if (!ExtractASIN(text)) {
            alert('This url is not valid');
            setText('');
            return;
        }
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

    return (
        <div>
            {text == 'result' && result ? (
                <div className={styles.pro}>
                    <h1>List of reviews</h1>
                    <button
                        className={styles.button}
                        onClick={() => {
                            analyze(output);
                        }}
                    >
                        Analyze !
                    </button>
                    <table>
                        <tbody>
                            <tr>
                                <th>Index</th>
                                <th>Review</th>
                                <th>Emotion</th>
                                <th>Labels</th>
                            </tr>
                            {result.map((element: any, index: number) => (
                                <tr key={index}>
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
                    <h1>Enter an Amazon product</h1>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles.textInput}
                    />
                    <h1>Labels</h1>
                    <TagsInput myTags={labels} setMyTags={setLabels} />
                    <button
                        className={styles.button}
                        onClick={() => {
                            setText('result');
                            analyze(scrapp());
                        }}
                    >
                        Search !
                    </button>
                </div>
            )}
        </div>
    );
};
