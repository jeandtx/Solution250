import { Elevation, Card, InputGroup, H1 } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './ia-prediction.module.scss';
import { useState, useEffect } from 'react';
import { loadLayersModel, tensor2d } from '@tensorflow/tfjs';

export interface FormCardProps {
    pathToModel?: string;
}

export const IAPrediction = ({ pathToModel }: FormCardProps) => {
    const [text, setText] = useState('');

    useEffect(() => {
        const loadModel = async () => {
            const model = await loadLayersModel(
                'src/assets/polarity/model.json'
            );
            return model;
        };

        const predict = async (text: string, model: any) => {
            const text_array = text.split(' ');
            const padded_text_array = text_array
                .slice(0, 500)
                .concat(Array(500 - text_array.length).fill(0)); // Filling with zeros instead of strings

            const padded_int_array = Array(500).fill(0);
            for (let i = 0; i < padded_text_array.length; i++) {
                padded_int_array[i] = parseInt(padded_text_array[i]);
                // error filling with NaN instead of int tokens
            }
            console.log(padded_int_array);
            const input = tensor2d(padded_int_array, [1, 500]); // Use tf.tensor2d for a 2D tensor
            const prediction = model.predict(input);
            // ! What is the prediction object ???
            console.log(prediction.arraySync()[0][0]);
            // https://medium.com/@andrew.w.sale/deploying-text-classification-from-keras-to-tensorflow-js-92c614dca4ec
        };

        const runPrediction = async () => {
            const loadedModel = await loadModel();
            predict(text, loadedModel);
        };

        runPrediction();
    }, [text]);

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
            <H1>Output</H1>
        </Card>
    );
};
