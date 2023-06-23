import { H6 } from '@blueprintjs/core';
import styles from './stars.module.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import yellowStar from '../../assets/yellowstar.png';
import greyStar from '../../assets/greystar.png';

export interface StarsProps {
  rating: number;
  review: string;
}

export const Stars = ({ rating, review }: StarsProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleAnalysis();
  }, []);

  const handleAnalysis = () => {
    // Simulating async analysis
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const convertToStars = (rating: number) => {
    const adjustedRating = (rating + 1) / 2;
    const convertedRating = adjustedRating * 5;
    const roundedRating = Math.round(convertedRating);

    const starsCount = 5;
    const fullStars = Math.floor(roundedRating);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={i} src={yellowStar} alt="Yellow Star" />);
    }

    for (let i = 0; i < 5 - fullStars; i++) {
      stars.push(<img key={fullStars + i + 1} src={greyStar} alt="Grey Star" />);
    }

    return { stars, fullStars };
  };

  let content;
  if (review.trim() === '' || rating === -0.26) {
    content = <div className={styles.error}><p>Invalid review. Please provide a valid review for analysis.</p></div>;
  } else {
    const { stars, fullStars } = convertToStars(rating);
    content = (
      <>
        <h2>"{review}"</h2>
        <p>{fullStars}/{stars.length}</p>
        <div>{stars}</div>
      </>
    );
  }

  const reloadPage = () => {
    window.location.reload();
  };

  const navigateToDetailedReview = () => {
    // Ajoutez ici la logique pour rediriger vers une revue détaillée
    // Utilisez la fonction de navigation appropriée selon votre configuration (ex: history.push('/detailed-review'))
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
              <button onClick={navigateToDetailedReview} className={styles.button2}>
                <h1>Detailed Review</h1>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
