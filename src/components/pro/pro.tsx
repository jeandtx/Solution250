import NivoPie from '../piechart/piechart';
import styles from './pro.module.scss';
import { useState, useEffect } from 'react';
import { ChartCarousel } from '../chart-carousel/chart-carousel';

export interface ProProps {
    text: string;
    labels: any;
}

export const Pro = ({ text, labels }: ProProps) => {
    async function getLabels(data: any) {
        const response = await fetch(
            // 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
            'https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli',
            {
                headers: {
                    Authorization:
                        'Bearer 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',
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    async function getEmotion(data: any) {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
            {
                headers: {
                    Authorization:
                        'Bearer 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',
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    async function getResume(data: any) {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            {
                headers: {
                    Authorization:
                        'Bearer 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',
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    async function getImage(data: any) {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
            {
                headers: {
                    Authorization:
                        'Bearer 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',
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    const fetchAll = async () => {
        getLabels({
            inputs: text,
            parameters: { candidate_labels: labels },
        }).then((response) => {
            let data: any = [];
            for (let i = 0; i < response.labels.length; i++) {
                data.push({
                    label: response.labels[i],
                    score: response.scores[i],
                });
            }
            setOutputLabel(data);
        });

        getEmotion({ inputs: text }).then((response) => {
            setOutputEmotion(response[0].slice(0, 5));
        });

        getResume({
            inputs: text,
        }).then((response) => {
            setOutputResume(JSON.stringify(response[0].summary_text));
        });

        getImage({ inputs: text }).then((response: any) => {
            const url: any = URL.createObjectURL(response);
            setOutputImage(url);
        });
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const [outputLabel, setOutputLabel] = useState('');
    const [outputEmotion, setOutputEmotion] = useState('');
    const [outputResume, setOutputResume] = useState('');
    const [outputImage, setOutputImage] = useState();
    return (
        <div className={styles.pro}>
            <div>This is the pro stats component for this review :</div>
            <div>{text}</div>
            <h1>outputLabel</h1>
            {outputLabel && outputLabel.length > 0 && (
                <ChartCarousel data={outputLabel} />
            )}
            <h1>outputEmotion</h1>
            {outputEmotion && outputEmotion.length > 0 && (
                <NivoPie data={outputEmotion} />
            )}
            <h1>outputResume</h1>
            <p>{outputResume}</p>
            <h1>outputImage</h1>
            <img
                src={outputImage}
                alt="image"
                style={{
                    width: '60%',
                    height: 'auto',
                }}
            />
        </div>
    );
};
