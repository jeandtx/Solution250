import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './text-input.module.scss';
import { Bar } from 'react-chartjs-2';

export const TextInput = () => {
    const [text, setText] = useState('');
    const [showCharts, setShowCharts] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setShowCharts(true);
    };

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
            <h1 className={styles.pageTitle}>
                Want to try our emotion analysis ?
            </h1>
            {showCharts ? (
                <div className={styles.chartContainer}>
                    {/* <Bar data={{}} options={{}} /> */}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <label className={styles.textInput}>
                        <span
                            className={`placeholder${
                                styles.text ? ' active' : ''
                            }`}
                        >
                            Enter your text
                        </span>
                        <textarea value={text} onChange={handleChange} />
                    </label>
                    <button type="submit" className={styles.submitButton}>
                        Analyze
                    </button>
                </form>
            )}
        </div>
    );
};
