import React from 'react';
import styles from './pro.module.scss';
import TagsInput from '../../components/tags-input/tags-input';

async function getLabels(data: any) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
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

async function getResume(data: any) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
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

async function getImage(data: any) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
        {
            headers: {
                Authorization: 'Bearer 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',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

export const Professionals: React.FC = () => {
    const [text, setText] = React.useState('');
    const [labels, setLabels]: any = React.useState([
        'good',
        'bad',
        'expensive',
        'cheap',
        'clean',
        'dirty',
    ]);
    const [outputLabel, setOutputLabel] = React.useState('');
    const [outputEmotion, setOutputEmotion] = React.useState('');
    const [outputResume, setOutputResume] = React.useState('');
    const [outputImage, setOutputImage] = React.useState();

    const fetchAll = async () => {
        getLabels({
            inputs: text,
            parameters: { candidate_labels: labels },
        }).then((response) => {
            setOutputLabel(JSON.stringify(response));
        });

        getEmotion({ inputs: text }).then((response) => {
            setOutputEmotion(JSON.stringify(response));
        });

        getResume({
            inputs: text,
        }).then((response) => {
            setOutputResume(JSON.stringify(response));
        });

        getImage({ inputs: text }).then((response: any) => {
            const url: any = URL.createObjectURL(response);
            setOutputImage(url);
        });
    };
    return (
        <div className={styles.pro}>
            <h1>Enter a review</h1>
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
                    fetchAll();
                }}
            >
                Search !
            </button>
            <h1>outputLabel</h1>
            <p>{outputLabel}</p>
            <h1>outputEmotion</h1>
            <p>{outputEmotion}</p>
            <h1>outputResume</h1>
            <p>{outputResume}</p>
            <h1>outputImage</h1>
            <img src={outputImage} alt="image" />
        </div>
    );
};
