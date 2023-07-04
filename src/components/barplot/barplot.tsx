import React,  { useState, useCallback }  from 'react';
import styles from './barplot.module.scss';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell} from 'recharts';

  interface BarPlotProps {
    data: any;
  }
  const colors = ['#8884d8', '#82ca9d', '#ffbb28', '#ff8042', '#888888'];

  
const BarPlot: React.FC<BarPlotProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = useCallback(
    (entry: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // Multiply scores by 100 to treat them as percentages
  const dataWithPercentage = data.map((entry: any, index: number ) => ({
    ...entry,
    score: (entry.score).toFixed(4) * 100,
    color: colors[index % colors.length],
  }));

  return (
    <div className={styles.div_barplot}>
      <BarChart width={830} height={350} data={dataWithPercentage}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis domain={[0, 100]}  />
        <Tooltip />
        <Bar dataKey="score" fill="#FF3D47" onClick={handleClick}>
          {dataWithPercentage.map((entry: any, index: number) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? '#ff3d47' : '#25338d'}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarPlot;