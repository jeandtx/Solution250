import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './text-input.module.scss';
import { Stars } from '../stars/stars';
import TagsInput from '../tags-input/tags-input';
import Switch from '@material-ui/core/Switch';

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
  const [lang, setLang] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  const textContainerRef = React.useRef<any>(null);
  const textAreaRef = React.useRef<any>(null);
  const isPro = true;

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    onChanges(event.target.value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (lang) {
      const translated = await translateText(text);
      setTranslatedText(translated);
      predict();
    //   consolelog
        console.log(translated);
    } else {
      predict();
    }
    setShowCharts(true);
    setCounter(0);
  };

  const updateTextContainerHeight = () => {
    const textContainer = textContainerRef.current;
    const textArea = textAreaRef.current;
    console.log(textArea.scrollHeight)
    if (textContainer && textArea) {
        if (textArea.scrollHeight > 52) {
            textContainer.style.height = 'auto';
            textArea.style.height = 'auto';
            const textAreaHeight = textArea.scrollHeight;
            textContainer.style.height = `${textAreaHeight+100}px`;
            textArea.style.height = `${textAreaHeight}px`;
        } else {
            textContainer.style.height = '150px';
            textArea.style.height = '150px';
        }
    }
    };

  const toggleLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.checked);
  };

  useEffect(() => {
    setCounter(text.length);
  }, [text]);

  const translateText = async (text : string) => {
    // Appeler l'API de traduction ici avec votre clé API
    // Utilisez la bibliothèque ou l'outil de traduction approprié
    // par exemple, en utilisant l'API de Google Translation
    // Assurez-vous d'importer les dépendances nécessaires

    // Exemple d'appel à l'API de Google Translation
    // Remplacez "YOUR_API_KEY" par votre clé API réelle
    const apiKey = "AIzaSyAeuG9j8aQIy74Hmk_VoaB0ik_tgIqILhA";
    const sourceLanguage = "fr"; // Langue source (français dans cet exemple)
    const targetLanguage = "en"; // Langue cible (anglais dans cet exemple)
    
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
        }),
      }
    );

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    return translatedText;
  };

  return (
    <div className={styles.homePageContainer}>
      {showCharts ? (
        <div className={styles.chartContainer}>
          <Stars
            rating={parseFloat(output)}
            review={text}
            back={setShowCharts}
            text={text}
            labels={labels}
          />
        </div>
      ) : (
        <>
          <div className={styles.inputContainer}>
            <div className={styles.titleContainer}>
              <h1 style={{ textAlign: 'center' }}>Get started!</h1>
              <p>Enter your reviews to get the feeling analysis</p>
            </div>
            {isPro ? <TagsInput myTags={labels} setMyTags={setLabels} /> : null}
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
              />
              <div className={styles.line}></div>
              <div className={styles.optionsContainer}>
                <p className={styles.counter}>{counter}/3000 characters</p>
                <div
                  className={styles.fileContainer}
                  onMouseOver={() => setHoverLogo(true)}
                  onMouseLeave={() => setHoverLogo(false)}
                >
                  <input type="file" />
                  <i
                    className="fa fa-upload"
                    style={
                      hoverLogo ? { color: 'white' } : { color: 'black' }
                    }
                  ></i>
                  
                </div>
                <Switch
                    checked={lang}
                    onChange={toggleLang}
                    name="langSwitch"
                    inputProps={{ 'aria-label': 'toggle language' }}
                  />
              </div>
            </div>
            <button onClick={handleSubmit} className={styles.button}>
              Smash to send
            </button>
          </div>
        </>
      )}
    </div>
  );
};
