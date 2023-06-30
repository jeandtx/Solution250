import styles from './stars.module.scss';
import { useState, useEffect } from 'react';
import yellowStar from '../../assets/yellowstar.png';
import greyStar from '../../assets/greystar.png';
import { Pro } from '../pro/pro';

export interface StarsProps {
    rating: number;
    review: string;
    back: any;
    text: string;
    labels: any;
}

export const Stars = ({ rating, review, back, text, labels }: StarsProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pro, setPro] = useState(false);

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
    if (review.trim() === '' || rating === -0.26435109972953796) {
        content = (
            <div className={styles.error}>
                <p>
                    Invalid review. Please provide a valid review for analysis.
                </p>
            </div>
        );
    } else {
        const { stars, fullStars } = convertToStars(rating);
        if (pro) {
            // ! content when pro
            content = (
                <>
                    <h2>"{review}"</h2>
                    <p>
                        {fullStars}/{stars.length}
                    </p>
                    <div>{stars}</div>
                    <div>This is the pro stats</div>
                    <Pro text={text} labels={labels} />
                </>
            );
        } else {
            // ! content when not pro
            content = (
                <>
                    <h2>"{review}"</h2>
                    <p>
                        {fullStars}/{stars.length}
                    </p>
                    <div>{stars}</div>
                    <div>
                        If you want to access more data you need to be a pro
                        user
                    </div>
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

    return (
        <div className={styles.menu}>
            <div className={styles.title}>
                <h1>Your analysis</h1>
            </div>
            <p>
                Thank you for using our tools. Here are the results for your
                analysis:
            </p>

            <div className={styles.result}>
                {isLoading ? (
                    <div className={styles.loading}></div>
                ) : (
                    <>
                        {content}
                        <div className={styles.buttons}>
                            <button
                                onClick={reloadPage}
                                className={styles.button1}
                            >
                                <h1>Reload Page</h1>
                            </button>
                            {!pro && (
                                <>
                                    {!pro && (
                                        <div className={styles.pro}>
                                            <button
                                                onClick={
                                                    navigateToDetailedReview
                                                }
                                                className={styles.button2}
                                            >
                                                <h1>Detailed Review</h1>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            <button
                onClick={() => {
                    console.log('reseted variables');
                    setPro(false);
                }}
                className={styles.button2}
            >
                RESET
            </button>
        </div>
    );
};
