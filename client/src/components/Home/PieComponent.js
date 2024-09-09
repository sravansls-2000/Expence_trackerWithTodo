import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
const COLORS = ['#bae6fd', '#2563eb'];

export default function PieComponent(props) {
  const { post, text } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    { name: 'Expence', value: post.expence },
    { name: 'Income', value: post.income },
  ];

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          className="count font-medium"
          textAnchor="middle"
          fill={text ? 'white' : 'black'}
        >
          {post.income - post.expence}
        </text>
        <text
          x={cx}
          y={cy + 20}
          dy={8}
          className="font-bold text-lg"
          textAnchor="middle"
          fill="#87CEEB"
        >
          Balance
        </text>

        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },

    [setActiveIndex]
  );

  return (
    <PieChart width={270} height={270} className="">
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={131}
        cy={130}
        innerRadius={110}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={1}
        onMouseEnter={onPieEnter}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
