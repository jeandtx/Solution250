import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './text-input.module.scss';
import { Bar } from 'react-chartjs-2';

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

    useEffect(() => {
        if (showCharts) {
            const data = Array.from({ length: 5 }, () =>
                Math.floor(Math.random() * 10)
            );

            const options = {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            };

            setTimeout(() => {
                setShowCharts(true);
            }, 1000);
        }
    }, [showCharts]);

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.titleContainer}>
                <h1 style={{ textAlign: 'center' }}>Get started!</h1>
                <text>Enter your reviews to get the feeling analysis</text>
                <div>{output}</div>
            </div>
            {showCharts ? (
                <div className={styles.chartContainer}>
                    {/* <Bar data={{}} options={{}} /> */}
                </div>
            ) : (
                <div className={styles.inputContainer}>
                    <textarea
                        onChange={handleTextChange}
                        maxLength={3000}
                        className={styles.textInput}
                    />
                    <text className={styles.counter}>
                        {counter}/3000 characters
                    </text>
                    <button onClick={handleSubmit} className={styles.button}>
                        Smash to send
                    </button>
                </div>
            )}
        </div>
    );
};
