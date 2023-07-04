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
                <div className={styles.barplot_container}>
                    {chartFocus === 1 && <span className={`${chartFocus === 1 ? styles.animation : ''}`}><BarPlot data={data}/></span>} 
                </div> 
                {chartFocus === 2 && <span className={`${chartFocus === 2 ? styles.animation : ''}`}><RadarComponent data={data}/></span>} 
            </div>
        </div>
    )
}