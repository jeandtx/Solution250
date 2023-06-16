import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './HomePage.scss'
import { Bar } from 'react-chartjs-2';


export const Home: React.FC = () => {
    const [text, setText] = useState('');
    const [showCharts, setShowCharts] = useState(false);
  
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Perform analysis or any other desired action with the entered text
      // ...
  
      // Show the charts and hide the text input
      setShowCharts(true);
    };
  
    useEffect(() => {
      if (showCharts) {
        // Generate random data for the chart
        const data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
  
        // Set options for the chart
        const options = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
  
        // Hide the text input after a delay (optional)
        setTimeout(() => {
          setShowCharts(true);
        }, 1000);
      }
    }, [showCharts]);
  
    return (
      <div className="homePageContainer">
        <h1 className="pageTitle">Want to try our emotion analysis ?</h1>
        {showCharts ? (
          <div className="chartContainer">
            <Bar data={{}} options={{}} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="formContainer">
            <label className="textInput">
              <span className={`placeholder${text ? ' active' : ''}`}>Enter your text</span>
              <textarea value={text} onChange={handleChange} />
            </label>
            <button type="submit" className="submitButton">Analyze</button>
          </form>
        )}
      </div>
    );
  };
