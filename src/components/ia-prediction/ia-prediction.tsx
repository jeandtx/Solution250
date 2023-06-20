import { Elevation, Card, InputGroup, H1, Button } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './ia-prediction.module.scss';
import { useState } from 'react';
import { loadLayersModel, tensor2d } from '@tensorflow/tfjs';
import { TextInput } from '../text-input/text-input';

export interface FormCardProps {
    pathToModel?: string;
    pathToTokenizer?: string;
}

export const IAPrediction = ({
    pathToModel,
    pathToTokenizer,
}: FormCardProps) => {
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');

    const loadModel = async (path: any) => {
        if (!path) {
            // todo: use ts to check if path is string
            throw new Error('Path to model not provided');
        }
        const model = await loadLayersModel(path);
        return model;
    };

    const loadTokenizer = async (path: any) => {
        if (!path) {
            // todo: use ts to check if path is string
            throw new Error('Path to tokenizer not provided');
        }
        let tokenizer: any = await import(path);
        return tokenizer.default;
    };

    const predict = async (text: string, model: any, tokenizer: any) => {
        const text_array = text.split(' ');
        const padded_text_array = text_array
            .slice(0, 500)
            .concat(Array(500 - text_array.length).fill('<UNKNOWN_WORD>'));
        const padded_int_array = new Array(500).fill(0);

        const tokenizer_words = Object.keys(tokenizer).map(
            (key) => tokenizer[key]
        );

        for (let i = 0; i < padded_text_array.length; i++) {
            const token = padded_text_array[i];
            try {
                if (tokenizer_words.indexOf(token)) {
                    padded_int_array[i] = tokenizer_words.indexOf(token) + 1;
                } else {
                    padded_int_array[i] =
                        tokenizer_words.indexOf('<UNKNOWN_WORD>');
                }
            } catch (error) {
                console.error('Error occurred while tokenizing:', error);
                throw error;
            }
        }

        const prediction = model.predict(tensor2d(padded_int_array, [1, 500]));
        setOutput(prediction.arraySync()[0][0].toFixed(2).toString());
    };

    const runPrediction = async () => {
        console.log('Running prediction' + text);
        const loadedModel = await loadModel(pathToModel);
        const loadedTokenizer = await loadTokenizer(pathToTokenizer);
        predict(text, loadedModel, loadedTokenizer).catch((err) =>
            console.log(err)
        );
    };

    return (
        <div>
            <TextInput
                textArg={text}
                onChanges={setText}
                predict={runPrediction}
                output={output}
            />
        </div>
    );
};
