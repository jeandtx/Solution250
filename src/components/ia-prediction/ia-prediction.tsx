import { Elevation, Card, InputGroup, H1, Button } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './ia-prediction.module.scss';
import { useState } from 'react';
import { loadLayersModel, tensor2d } from '@tensorflow/tfjs';

export interface FormCardProps {
    pathToModel?: string;
}

export const IAPrediction = ({ pathToModel }: FormCardProps) => {
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');

    const loadModel = async () => {
        const model = await loadLayersModel('src/assets/polarity/model.json');
        return model;
    };

    const predict = async (text: string, model: any) => {
        const text_array = text.split(' ');
        const padded_text_array = text_array
            .slice(0, 500)
            .concat(Array(500 - text_array.length).fill('<UNKNOWN_WORD>'));

        const padded_int_array = new Array(500).fill(0);

        let tokenizer: any = await import(
            '../../assets/polarity/tokenizer.json'
        );

        tokenizer = tokenizer.default;
        console.log('Tokenizer loaded');
        const tokenizer_keys = Object.keys(tokenizer);
        const tokenizer_words = tokenizer_keys.map((key) => tokenizer[key]);
        console.log(tokenizer_words.slice(0, 10));
        console.log(tokenizer_words.indexOf('love') + 1);

        for (let i = 0; i < padded_text_array.length; i++) {
            const token = padded_text_array[i];
            try {
                if (tokenizer_words.indexOf(token)) {
                    padded_int_array[i] = tokenizer_words.indexOf(token) + 1;
                } else {
                    padded_int_array[i] = tokenizer['<UNKNOWN_WORD>'];
                }
            } catch (error) {
                console.error('Error occurred while tokenizing:', error);
                throw error;
            }
        }

        console.log(padded_int_array);
        const input = tensor2d(padded_int_array, [1, 500]);
        const prediction = model.predict(input);
        console.log(prediction.arraySync()[0][0]);
        setOutput(prediction.arraySync()[0][0].toString());
        // https://medium.com/@andrew.w.sale/deploying-text-classification-from-keras-to-tensorflow-js-92c614dca4ec
    };

    const runPrediction = async () => {
        const loadedModel = await loadModel();
        predict(text, loadedModel).catch((err) => console.log(err));
    };

    return (
        <Card
            className={classNames(styles.card, styles.wrapper)}
            elevation={Elevation.FOUR}
        >
            <InputGroup
                type="text"
                fill
                round
                placeholder="Enter a review"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => runPrediction()}>Predict</Button>
            <H1>Output: {output}</H1>
        </Card>
    );
};
