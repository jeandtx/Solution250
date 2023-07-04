import React, { useState } from 'react';
import styles from './chart-carousel.module.scss';
import NivoPie from '../piechart/piechart';
import BarPlot from '../barplot/barplot';
import RadarComponent from '../radar-chart/radar-chart';
import 'font-awesome/css/font-awesome.min.css'

export interface ChartCarouselProps {
    data: string;
}

export const ChartCarousel = ({ data }: ChartCarouselProps) => {
    const [chartFocus, setChartFocus] = useState(0);

    const handlePieFocus = () => {
        setChartFocus(0);
    }

    const handleBarFocus = () => {
        setChartFocus(1);
    }

    const handleRadarFocus = () => {
        setChartFocus(2);
    }

    const d = [
        { label: "clean", score: 0.6559953093528748 },
        { label: "expensive", score: 0.1470905840396881 },
        { label: "cheap", score: 0.08228608965873718 },
        { label: "dirty", score: 0.06026162579655647 },
        { label: "bad", score: 0.05436636880040169 }
      ];

    return(
        <div className={styles.container}>
            <div className={styles.selectContainer}>
                <span className={styles.pieChart} onClick={handlePieFocus}>
                    <i className="fa fa-pie-chart fa-sm" style={{transition: '0.5s',color: chartFocus === 0 ? "#ff3d47" : "black"}}/>
                </span>
                <span className={styles.barChart} onClick={handleBarFocus}>
                    <i className="fa fa-bar-chart fa-sm" style={{transition: '0.5s', color: chartFocus === 1 ? "#ff3d47" : "black"}}/>
                </span>
                <span className={styles.radarChart} onClick={handleRadarFocus}>
                    <i className="fa fa-diamond fa-sm" style={{transition: '0.5s', color: chartFocus === 2 ? "#ff3d47" : "black"}}/>
                </span>
            </div>
            <div className={styles.chartContainer}>
                {chartFocus === 0 && <span className={`${chartFocus === 0 ? styles.animation : ''}`}><NivoPie data={data}/></span>}
                    {chartFocus === 1 && <span className={`${chartFocus === 1 ? styles.animation : ''}`}><BarPlot data={data}/></span>} 
<<<<<<< Updated upstream
=======
                </div> 
                <div className={styles.radar_container}>
                    {chartFocus === 2 && <span className={`${chartFocus === 2 ? styles.animation : ''}`}><RadarComponent data={data}/></span>} 
                </div> 
<<<<<<< Updated upstream
                
>>>>>>> Stashed changes
=======
                <div className={styles.radar_container}>
                    {chartFocus === 2 && <span className={`${chartFocus === 2 ? styles.animation : ''}`}><RadarComponent data={data}/></span>} 
                </div> 
                
>>>>>>> Stashed changes
            </div>
        </div>
    )
}