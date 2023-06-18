import React from 'react';
import './home.module.scss';
import { TextInput } from '../../components/text-input/text-input';
import { Navbar } from '@blueprintjs/core';
import { Footer } from '../../components/footer/footer';

export const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <TextInput />
            <Footer />
        </div>
    );
};
