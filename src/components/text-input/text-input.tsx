import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './text-input.module.scss';
import { Stars } from '../stars/stars';
import TagsInput from '../tags-input/tags-input';
import Switch from '@material-ui/core/Switch';
import { Scrapping } from '../scrapping/scrapping';

export interface FormCardProps {
    textArg?: any;
    onChanges?: any;
    predict?: any;
    output?: any;
    language?: any;
    lang?: any;
}

export const TextInput = ({
    textArg,
    onChanges,
    predict,
    output,
    language,
    lang,
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
    const textContainerRef = React.useRef<any>(null);
    const textAreaRef = React.useRef<any>(null);
    const isPro = true;
    const [CSVcontent, setCSVcontent] = useState<any>(null);

    useEffect(() => {
        setCounter(text.length);
    }, [text]);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        onChanges(event.target.value);
    };

    const handleSubmit = () => {
        predict();
        setShowCharts(true);
        setCounter(0);
    };

    const updateTextContainerHeight = () => {
        const textContainer = textContainerRef.current;
        const textArea = textAreaRef.current;
        console.log(textArea.scrollHeight);
        if (textContainer && textArea) {
            if (textArea.scrollHeight > 52) {
                textContainer.style.height = 'auto';
                textArea.style.height = 'auto';
                const textAreaHeight = textArea.scrollHeight;
                textContainer.style.height = `${textAreaHeight + 100}px`;
                textArea.style.height = `${textAreaHeight}px`;
            } else {
                textContainer.style.height = '150px';
                textArea.style.height = '150px';
            }
        }
    };

    useEffect(() => {
        setCounter(text.length);
        // a chaque fois que la page est chargé le text area est vide
    }, [text]);

    const resetText: any = () => {
        setText('');
    };

    const toggleLang = (event: React.ChangeEvent<HTMLInputElement>) => {
        language(event.target.checked);
    };

    function handleFileInput(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const csvData = reader.result as string;
                const jsonData = convertCsvToJson(csvData);
                console.log(jsonData);
            };

            reader.readAsText(file);
        }
    }

    function convertCsvToJson(csvData: string): object {
        const lines = csvData.split('\n');

        const result: { [key: string]: string } = {};
        for (let i = 0; i < lines.length; i++) {
            const currentValue = lines[i].trim(); // Remove leading/trailing whitespace

            if (currentValue) {
                result[i.toString()] = currentValue;
            }
        }

        return result;
    }

    const handleEnterPress = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        const keyCode = event.keyCode;
        if (keyCode === 13) {
            handleSubmit();
        }
    };

    const ExtractASIN = (text: string) => {
        let ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
        let cMatch = RegExp(ASINreg).exec(text);
        if (cMatch == null) {
            console.log('No ASIN found');
            return null;
        }
        return cMatch[1];
    };

    return (
        <div className={styles.homePageContainer}>
            {showCharts ? (
                <div className={styles.chartContainer}>
                    {ExtractASIN(text) ? (
                        <div>
                            <Scrapping text={text} labels={labels} />
                        </div>
                    ) : (
                        <Stars
                            rating={parseFloat(output)}
                            review={text}
                            back={setShowCharts}
                            text={text}
                            labels={labels}
                            resetText={resetText}
                            pro={isPro}
                        />
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.inputContainer}>
                        <div className={styles.titleContainer}>
                            <h1 style={{ textAlign: 'center' }}>
                                Get started!
                            </h1>
                            <p>
                                Enter your reviews to get the feeling analysis
                            </p>
                        </div>
                        {isPro ? (
                            <TagsInput myTags={labels} setMyTags={setLabels} />
                        ) : null}
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
                                placeholder="Enter your review here..."
                                onKeyDown={handleEnterPress}
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
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileInput}
                                    />
                                    <i
                                        className="fa fa-upload"
                                        style={
                                            hoverLogo
                                                ? { color: 'white' }
                                                : { color: 'black' }
                                        }
                                    ></i>
                                </div>
                                <img
                                    src={'src\\assets\\en_flag.png'}
                                    alt="English flag"
                                    height="15"
                                    width="22.5"
                                    style={{
                                        marginTop: '11px',
                                        marginLeft: '-16px',
                                        position: 'absolute',
                                    }}
                                />
                                <Switch
                                    checked={lang}
                                    onChange={toggleLang}
                                    name="langSwitch"
                                    inputProps={{
                                        'aria-label': 'toggle language',
                                    }}
                                />
                                <img
                                    src={'src\\assets\\fr_flag.png'}
                                    alt="English flag"
                                    height="15"
                                    width="22.5"
                                    style={{
                                        marginTop: '11px',
                                        marginLeft: '-6px',
                                        position: 'absolute',
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className={styles.button}
                        >
                            Smash to send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
