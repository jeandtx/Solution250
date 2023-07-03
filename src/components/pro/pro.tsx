import NivoPie from '../piechart/piechart';
import styles from './pro.module.scss';
import { useState, useEffect } from 'react';
import { ChartCarousel } from '../chart-carousel/chart-carousel';

export interface ProProps {
    text: string;
    labels: any;
}

export const Pro = ({ text, labels }: ProProps) => {
    const apiKey = 'AIzaSyAeuG9j8aQIy74Hmk_VoaB0ik_tgIqILhA';
    const targetLanguage = 'en';

    async function traduce(text: string) {
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    target: targetLanguage,
                }),
            }
        );

        const data = await response.json();
        const translatedText = data.data.translations[0].translatedText;
        console.log('Pro text' + translatedText);
        return translatedText;
    }

    async function getLabels(data: any) {
        const response = await fetch(
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

    const [loading, setLoading] = useState(true);
    const [outputLabel, setOutputLabel] = useState('');
    const [outputEmotion, setOutputEmotion] = useState('');
    const [outputResume, setOutputResume] = useState('');
    const [outputImage, setOutputImage] = useState('');

    const fetchAll = async () => {
        const translatedText = await traduce(text);

        Promise.all([
            getLabels({
                inputs: translatedText,
                parameters: { candidate_labels: labels },
            }),
            getEmotion({ inputs: translatedText }),
            getResume({ inputs: translatedText }),
            getImage({ inputs: translatedText }),
        ]).then(([labelsRes, emotionsRes, resumeRes, imageRes]) => {
            if(labelsRes && labelsRes.labels){
                let data: any = [];
                for (let i = 0; i < labelsRes.labels.length; i++) {
                    data.push({
                        label: labelsRes.labels[i],
                        score: labelsRes.scores[i],
                    });
                }
                setOutputLabel(data);
            }
        
            if(emotionsRes && emotionsRes[0]){
                setOutputEmotion(emotionsRes[0].slice(0, 5));
            }
        
            if(resumeRes && resumeRes[0]){
                setOutputResume(JSON.stringify(resumeRes[0].summary_text));
            }
        
            if(imageRes){
                const url: any = URL.createObjectURL(imageRes);
                setOutputImage(url);
            }
            setLoading(false);
        }).catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchAll();
    }, []);

    if (loading) {
    return <div className={styles.loading} />;
    }

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
