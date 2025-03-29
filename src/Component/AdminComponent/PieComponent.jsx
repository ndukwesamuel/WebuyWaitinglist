import React from "react";

import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Failed", value: 130 },
  { name: "Pending", value: 200 },
  { name: "Success", value: 150 },
];

const COLORS = ["#F60707", "#AA6A09", "#009B4D"];

const RADIAN = Math.PI / 100;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieComponent = () => {
  return (
    <div>
      <div>
        <PieChart width={240} height={200}>
          <Pie
            data={data}
            cx="44%"
            cy="55%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="grid grid-cols-4 mt-5 ml-6">
          {data.map((item) => (
            <p className="text-[10px] text-center font-bold cursor-pointer">
              {item.name}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-4 mt-[5px] ml-12">
          {COLORS.map((item) => (
            <div
              className="h-[10px] w-[10px] rounded-full  "
              style={{ backgroundColor: item }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieComponent;
