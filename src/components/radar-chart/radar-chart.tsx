import React from 'react';
import styles from './radar-chart.module.scss';
import {RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar} from 'recharts';

  interface RadarComponentProps {
    data: any;
  }

const RadarComponent: React.FC<RadarComponentProps> = ({ data }) => {
  const dataWithPercentage = data.map((entry: any ) => ({
    ...entry,
    score: (entry.score).toFixed(2) * 100,
  }));

  return (
    <div className={styles.div_barplot}>
        <RadarChart outerRadius={90} width={600} height={400} data={dataWithPercentage}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar dataKey="score" stroke="#ff7529" fill="#ffa645" fillOpacity={0.6} />
        </RadarChart>
    </div>
  );
};

export default RadarComponent;