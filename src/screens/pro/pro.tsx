import React from 'react';
import styles from './pro.module.scss';
import TagsInput from '../../components/tags-input/tags-input';

async function query(data: any) {
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
    const [output, setOutput] = React.useState('');

    const test = async () => {
        query({
            inputs: text,
            parameters: { candidate_labels: labels },
        }).then((response) => {
            setOutput(JSON.stringify(response));
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
            <TagsInput myTags={labels} />
            <button
                className={styles.button}
                onClick={() => {
                    test();
                }}
            >
                Search !
            </button>
            <h1>Output</h1>
            <p>{output}</p>
        </div>
    );
};
