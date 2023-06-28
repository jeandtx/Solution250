import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './text-input.module.scss';
import { Stars } from '../stars/stars';
import TagsInput from '../tags-input/tags-input';

export interface FormCardProps {
    textArg?: any;
    onChanges?: any;
    predict?: any;
    output?: any;
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

export const TextInput = ({
    textArg,
    onChanges,
    predict,
    output,
}: FormCardProps) => {
    const [text, setText] = useState(textArg ?? '');
    const [showCharts, setShowCharts] = useState(false);
    const [counter, setCounter] = useState(0);
    const [focusArea, setFocusArea] = useState(false);
    const [hoverLogo, setHoverLogo] = useState(false);
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
    const textContainerRef = React.useRef<any>(null);
    const textAreaRef = React.useRef<any>(null);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        onChanges(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        predict();
        setShowCharts(true);
        setCounter(0);
    };

    const updateTextContainerHeight = () => {
        const textContainer = textContainerRef.current;
        const textArea = textAreaRef.current;
        if (textContainer && textArea) {
            if (textArea.scrollHeight > 150) {
                textContainer.style.height = 'auto';
                textArea.style.height = 'auto';
                const textAreaHeight = textArea.scrollHeight;
                textContainer.style.height = `${textAreaHeight + 100}px`;
                textArea.style.height = `${textAreaHeight}px`;
            } else {
                textContainer.style.height = '250px';
                textArea.style.height = '150px';
            }
        }
    };

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
        console.log('fetchAll');
    };

    useEffect(() => {
        setCounter(text.length);
    }, [text]);

    return (
        <div className={styles.homePageContainer}>
            {showCharts ? (
                <div className={styles.chartContainer}>
                    <Stars
                        rating={parseFloat(output)}
                        review={text}
                        back={setShowCharts}
                    />
                </div>
            ) : (
                <div className={styles.inputContainer}>
                    <div className={styles.titleContainer}>
                        <h1 style={{ textAlign: 'center' }}>Get started!</h1>
                        <p>Enter your reviews to get the feeling analysis</p>
                    </div>
                    <div
                        ref={textContainerRef}
                        className={`${styles.textContainer} ${
                            focusArea ? styles.textFocus : ''
                        }`}
                    >
                        <textarea
                            ref={textAreaRef}
                            onChange={handleTextChange}
                            maxLength={3000}
                            className={styles.textInput}
                            onFocus={() => setFocusArea(true)}
                            onBlur={() => setFocusArea(false)}
                            onInput={updateTextContainerHeight}
                        />
                        <div className={styles.line}></div>
                        <div className={styles.optionsContainer}>
                            <p className={styles.counter}>
                                {counter}/3000 characters
                            </p>
                            <div
                                className={styles.fileContainer}
                                onMouseOver={() => setHoverLogo(true)}
                                onMouseLeave={() => setHoverLogo(false)}
                            >
                                <input type="file" />
                                <i
                                    className="fa fa-upload"
                                    style={
                                        hoverLogo
                                            ? { color: 'white' }
                                            : { color: 'black' }
                                    }
                                ></i>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className={styles.button}>
                        Smash to send
                    </button>
                    <TagsInput myTags={labels} setMyTags={setLabels} />
                </div>
            )}
        </div>
    );
};
