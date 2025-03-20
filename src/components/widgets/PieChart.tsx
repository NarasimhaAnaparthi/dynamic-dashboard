import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie as PieChartComponent } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const Piechart: React.FC<{ data: number[] }> = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  const chartData = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <PieChartComponent ref={chartRef} data={chartData} />;
};

export default Piechart;
