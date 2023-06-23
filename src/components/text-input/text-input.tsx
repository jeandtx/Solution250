import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './text-input.module.scss';
import { Stars } from '../stars/stars';

export interface FormCardProps {
    textArg?: any;
    onChanges?: any;
    predict?: any;
    output?: any;
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

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        onChanges(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        predict();
        setShowCharts(true);
    };

    useEffect(() => {
        setCounter(text.length);
    }, [text]);

    return (
        <div className={styles.homePageContainer}>
            {showCharts ? (
                <div className={styles.chartContainer}>              
                    <Stars rating={parseFloat(output)} review={text} back={setShowCharts}/>
                </div>
            ) : (
                <div className={styles.inputContainer}>
                    <div className={styles.titleContainer}>
                        <h1 style={{ textAlign: 'center' }}>Get started!</h1>
                        <p>Enter your reviews to get the feeling analysis</p>
                    </div>
                    <textarea
                        onChange={handleTextChange}
                        maxLength={3000}
                        className={styles.textInput}
                    />
                    <p className={styles.counter}>
                        {counter}/3000 characters
                    </p>
                    <button onClick={handleSubmit} className={styles.button}>
                        Smash to send
                    </button>
                </div>
            )}
        </div>
    );
};
