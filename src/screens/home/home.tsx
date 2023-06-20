import React from 'react';
import './home.module.scss';
import { TextInput } from '../../components/text-input/text-input';
import { IAPrediction } from '../../components/ia-prediction/ia-prediction';

export const Home: React.FC = () => {
    return (
        <div>
            <IAPrediction
                pathToTokenizer="../../assets/polarity/tokenizer.json"
                pathToModel="src/assets/polarity/model.json"
            />
        </div>
    );
};
