import React from 'react';
import { Line } from '@ant-design/charts';
export default function DataChart({ data }) {
  const config = {
    data,
    xField: 'time',
    yField: 'profit',
    point: {
      size: 5,
      shape: 'diamond',
    },
  }
  return (
    <div>
      {data &&
        <Line {...config} />
      }
    </div>
  )
}