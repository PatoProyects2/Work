import React from 'react';
import { Line } from '@ant-design/plots';
export default function DataChart({ data }) {
  const config = {
    data,
    padding: 'auto',
    xField: 'time',
    yField: 'profit',
    color: '#FFD500',
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
      },
    ],
  }
  return (
    <div>
      {data &&
        <Line {...config} />
      }
    </div>
  )
}