import { useState, useCallback, useEffect } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";
import useWindowDimensions from "./useWindowDimensions";
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
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
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}vnđ`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
export default function DashboardSalePiechart({ orders, numDays }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLegend, setShowLegend] = useState(true);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 450) {
      console.log("run this");
      setShowLegend(false);
    } else {
      setShowLegend(true);
    }
  }, [width]);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );
  const drinkTotal = orders.reduce((sum, item) => {
    return sum + item.drinkPrice;
  }, 0);
  const foodTotal = orders.reduce((sum, item) => {
    return sum + item.foodPrice;
  }, 0);
  const noodleTotal = orders.reduce((sum, item) => {
    return sum + item.noodlePrice;
  }, 0);
  const data = [
    { name: `Nước: ${drinkTotal}vnd`, value: drinkTotal, color: "#16a34a" },
    { name: `Mỳ: ${noodleTotal}vnd`, value: foodTotal, color: "#f472b6" },
    { name: `Cơm: ${foodTotal}vnd`, value: noodleTotal, color: "#fbbf24" },
  ];
  return (
    <div className="col-span-1 h-full border-2 border-blue-600">
      <h2 className="m-5  text-xl font-bold">
        Tỉ lệ doanh thu trong {numDays} ngày
      </h2>
      <ResponsiveContainer width={`100%`} height={400}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={"52%"}
            cy={"50%"}
            innerRadius={"60%"}
            outerRadius={"70%"}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry: any, index) => (
              <Cell fill={entry.color} stroke={entry.color} key={index} />
            ))}
          </Pie>
          {showLegend && (
            <Legend
              layout="vertical"
              iconSize={15}
              iconType="circle"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                lineHeight: "40px",
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
