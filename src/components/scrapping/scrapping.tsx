import React, { useEffect, useState } from 'react';
import styles from './scrapping.module.scss';
import axios from 'axios';
import { ChartCarousel } from '../chart-carousel/chart-carousel';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    const [output, setOutput] = useState([]);
    const [result, setResult] = useState<any>(null);
    const [resultEmotion, setResultEmotion] = useState<any>(null);
    const [resultLabels, setResultLabels] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const scrapp = async () => {
        const params = {
            api_key: 'F78CE4FFCC9E44409E8074DFF59CB762',
            amazon_domain: 'amazon.com',
            type: 'reviews',
            asin: ExtractASIN(text),
        };

        try {
            const response = await axios.get('https://api.asindataapi.com/request', { params });
            let out: any = [];
            const reviews = response.data.reviews;
            for (const element of reviews) {
                out.push(element.body.toString());
            }
            setOutput(out);
            console.log(out);
            return out;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const calculateMeanLabels = (
        data: Record<string, any>
    ): { label: string; score: number }[] => {
        const keys = Object.keys(data);
        const itemCount = keys.length;

        // Initialize the sum of scores for each label
        const labelSums: Record<string, number> = {};

        // Iterate through each item in the dictionary
        for (const key of keys) {
            const item = data[key];
            const scores = item.labels.scores;

            // Iterate through each score and update the sum for the corresponding label
            for (let i = 0; i < scores.length; i++) {
                const label = item.labels.labels[i];
                const score = scores[i];

                if (labelSums[label]) {
                    labelSums[label] += score;
                } else {
                    labelSums[label] = score;
                }
            }
        }

        // Calculate the mean for each label
        const labelMeans: Record<string, number> = {};
        for (const label in labelSums) {
            labelMeans[label] = labelSums[label] / itemCount;
        }

        // Convert the labelMeans object to an array of label-score pairs
        const meanList = Object.entries(labelMeans).map(([label, score]) => ({
            label,
            score,
        }));

        return meanList;
    };
    const calculateMeanEmotion = (
        data: Record<string, any>
    ): { label: string; score: number }[] => {
        const keys = Object.keys(data);
        const itemCount = keys.length;

        // Initialize the sum of scores for each label
        const labelSums: Record<string, number> = {};

        // Iterate through each item in the dictionary
        for (const key of keys) {
            const item = data[key];
            const emotions = item.emotion[0];

            // Iterate through each emotion and update the sum for the corresponding label
            for (const emotion of emotions) {
                const label = emotion.label;
                const score = emotion.score;

                if (labelSums[label]) {
                    labelSums[label] += score;
                } else {
                    labelSums[label] = score;
                }
            }
        }

        // Calculate the mean for each label
        const labelMeans: Record<string, number> = {};
        for (const label in labelSums) {
            labelMeans[label] = labelSums[label] / itemCount;
        }

        // Convert the labelMeans object to an array of label-score pairs
        const meanList = Object.entries(labelMeans).map(([label, score]) => ({
            label,
            score,
        }));

        return meanList;
    };

    const transform_result = (result: any) => {
        const transformed_result = Object.values(result).map((item: any) => {
            const review = item.review;
            const firstSentiment = item.emotion[0][0].label;
            const firstLabel = item.labels.labels[0];

            return { review, firstSentiment, firstLabel };
        });
        console.log(transformed_result);
        return transformed_result;
    };
    const analyze = async () => {
        const out = await scrapp();
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
        setResultEmotion(calculateMeanEmotion(result).sort());
        setResultLabels(calculateMeanLabels(result));
        setResult(transform_result(result));
        setLoading(false);
    };

    useEffect(() => {
        analyze();
    }, []);

    return (
        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <CircularProgress size={80} style={{ color: '#FF3D47' }} />
            </div>


            
            ) :result ? (
                <div className={styles.pro}>
                    <h1>List of reviews</h1>
                    <div className="charts">
                        <h1>Result per Emotions</h1>
                        <ChartCarousel data={resultEmotion} />
                        <h1>Result per Labels</h1>
                        <ChartCarousel data={resultLabels} />
                    </div>
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

