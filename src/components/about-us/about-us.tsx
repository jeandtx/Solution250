import styles from './about-us.module.scss';
import React from 'react';

interface SectionProps {
    title: string;
    text: string;
    image: string;
    imageRight: boolean;
}

const Section : React.FC<SectionProps> = ({ title, text, image, imageRight }) => {
    return (
      <div>
        {imageRight ? (
          <div className={styles.divIMGLeft}>
          <div className={styles.image_section_left}>
            <img className={styles.img_about} src={image} alt={title} />
          </div>
          <div className={styles.text_right}>
            <h2 className={styles.title2}>{title}</h2>
            <p className={styles.aboutText}>{text}</p>
          </div>
        </div>
        ) : (
          <div className={styles.divIMGRight}>
          <div className={styles.text_left}>
            <h2 className={styles.title2}>{title}</h2>
            <p className={styles.aboutText}>{text}</p>
          </div>
          <div className={styles.image_section_right}>
            <img className={styles.img_about} src={image} alt={title}  />
          </div>
        </div>
        )}
      </div>
    );
  };

export const AboutUs: React.FC = () => {
    return (
        <div>
        <Section
            title="About Us"
            text="We are a team of five students at EFREI, specialized in the Data Science major.
            Passionate about the possibilities offered by artificial intelligence, we have designed a revolutionary scanner software,
            capable of inferring a customer's emotions through their commentary using advanced machine learning techniques."
            image="src/assets/GroupDiscussion.png"
            imageRight={false}
        />
        <Section
            title="Using AI"
            text="By using AI, you can be confident that you have a reliable and high-performing tool to assist you in a rapidly changing world.
            Our dedicated teams, driven by their commitment and diverse skills, work to meet your needs every day!"
            image="src/assets/Robot-face.png"
            imageRight={true}
        />
        <Section
            title="Our Ambition"
            text="Our ambition is to enable businesses to thrive by truly understanding their customers, 
            enabling them to make optimal decisions and become the absolute best in customer service."
            image="src/assets/Investment_data.png"
            imageRight={false}
        />
    </div>
    );
};




