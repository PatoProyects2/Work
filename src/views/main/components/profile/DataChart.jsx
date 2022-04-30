import React from 'react';
import { Line } from '@ant-design/charts';
export default function DataChart({ data }) {
  const config = {
    data,
    xField: 'time',
    yField: 'profit',
    color: '#FFD500',
    point: {
      size: 2,
      shape: 'circle',
      style: {
        fill: 'orange',
        stroke: '#f7b100',
        lineWidth: 2,
      },
    },
    theme: {
      styleSheet: {
        fontFamily: "Lucida Console"
      }
    },
    annotations: [
      {
        type: 'line',
        start: ['min', '0'],
        end: ['max', '0'],
        style: {
          stroke: '#FF0000',
          lineDash: [2, 2],
        },
      },
      {
        type: 'regionFilter',
        start: ['min', '0'],
        end: ['max', '-10000'],
        color: '#FF0000',
      }
    ],
    // interactions: [{ type: 'element-active' }, { type: 'brush' }]
  }
  return (
    <div>
      {data &&
        <Line {...config} />
      }
    </div>
  )
}