import { H6 } from '@blueprintjs/core';
import styles from './stars.module.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import yellowStar from '../../assets/yellowstar.png';
import greyStar from '../../assets/greystar.png';

export interface StarsProps {
    rating: number;
    review: string;
    back: any;
    text: string;
    labels: any;
}

async function getLabels(data: any) {
    const response = await fetch(
        // 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
        'https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli',
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

async function getEmotion(data: any) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
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

async function getResume(data: any) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
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

async function getImage(data: any) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
        {
            headers: {
                Authorization: 'Bearer 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',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

export const Stars = ({ rating, review, back, text, labels }: StarsProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pro, setPro] = useState(false);
    const [outputLabel, setOutputLabel] = useState('');
    const [outputEmotion, setOutputEmotion] = useState('');
    const [outputResume, setOutputResume] = useState('');
    const [outputImage, setOutputImage] = useState();

    useEffect(() => {
        setPro(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const convertToStars = (rating: number) => {
        const adjustedRating = (rating + 1) / 2;
        const convertedRating = adjustedRating * 5;
        const roundedRating = Math.round(convertedRating);

        const fullStars = Math.floor(roundedRating);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <img
                    key={i}
                    className={`${styles.star}`}
                    src={yellowStar}
                    alt="Yellow Star"
                    style={{ animationDelay: `${i * 0.2}s` }}
                />
            );
        }

        for (let i = 0; i < 5 - fullStars; i++) {
            stars.push(
                <img
                    key={fullStars + i + 1}
                    className={`${styles.star}`}
                    src={greyStar}
                    alt="Grey Star"
                    style={{ animationDelay: `${(fullStars + i) * 0.2}s` }}
                />
            );
        }

        return { stars, fullStars };
    };

    let content;
  if (review.trim() === '' || rating === -0.26) {
    content = (
      <div className={styles.error}>
        <p>Invalid review. Please provide a valid review for analysis.</p>
      </div>
    );
  } else {
    const { stars, fullStars } = convertToStars(rating);
    console.log(rating)
    content = (
      <>
        <h2>"{review}"</h2>
        <p>
          {fullStars}/{stars.length}
        </p>
        <div>{stars}</div>
      </>
    );
    if (pro) {
      content = (
        <>
          <h2>"{review}"</h2>
          <p>
            {fullStars}/{stars.length}
          </p>
          <div>{stars}</div>
          <div>This is the pro stats</div>
        </>
      );
    }
  }

    const reloadPage = () => {
        back(false); // Cache le graphique
    };

    const navigateToDetailedReview = () => {
        // Check if the user is a pro user
        // pro being a props of this component
        setPro(true);
    };

    const fetchAll = async (text: any, labels: any) => {
        getLabels({
            inputs: text,
            parameters: { candidate_labels: labels },
        }).then((response) => {
            setOutputLabel(JSON.stringify(response));
        });

        getEmotion({ inputs: text }).then((response) => {
            setOutputEmotion(JSON.stringify(response));
        });

        getResume({
            inputs: text,
        }).then((response) => {
            setOutputResume(JSON.stringify(response));
        });

        getImage({ inputs: text }).then((response: any) => {
            const url: any = URL.createObjectURL(response);
            setOutputImage(url);
        });
        console.log('fetchAll');
    };

    return (
        <div className={styles.menu}>
          <div className={styles.title}>
            <h1>Your analysis</h1>
          </div>
          <p>Thank you for using our tools. Here are the results for your analysis:</p>
    
          <div className={styles.result}>
            {isLoading ? (
              <div className={styles.loading}></div>
            ) : (
              <>
                {content}
                <div className={styles.buttons}>
                  <button onClick={reloadPage} className={styles.button1}>
                    <h1>Reload Page</h1>
                  </button>
                  {!pro && (
                    <>
                      <button onClick={navigateToDetailedReview} className={styles.button2}>
                        <h1>Detailed Review</h1>
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      );
    };
    
    
    
    
    
    
    