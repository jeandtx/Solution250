import React from 'react';
import styles from './piechart.module.scss';
import PropTypes from 'prop-types'
import { ResponsivePie } from '@nivo/pie';

    interface NivoPieProps {
        data: any;
    }

      const MyResponsivePie = ({data}: { data: any}) => (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )

      const NivoPie: React.FC<NivoPieProps> = ({ data }) => {
        const colors = ["hsl(288, 70%, 50%)", "hsl(105, 70%, 50%)", "hsl(83, 70%, 50%)", "hsl(100, 70%, 50%)", "hsl(285, 70%, 50%)" ,
        "hsl(0, 70%, 50%)",
        "hsl(45, 70%, 50%)",
        "hsl(135, 70%, 50%)",
        "hsl(180, 70%, 50%)",
        "hsl(240, 70%, 50%)" ]

        const labeledArray = data.map((item: any, index: number) => ({
          id: item.label,
          label: item.label,
          value: (item.score * 100).toFixed(2),
          color: colors[index % colors.length]
        }));
    
      return (
        <div className={styles.div_piechart}> 
          <MyResponsivePie data={labeledArray}/>
        </div>
      );
    };
      export default NivoPie;
