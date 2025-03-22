import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar as BarChartComponent } from "react-chartjs-2";

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart: React.FC<{ labels: string[]; values: number[] }> = ({
  labels,
  values,
}) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [labels, values]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Data",
        data: values,
        backgroundColor: "#42A5F5",
      },
    ],
  };
  //@ts-ignore
  return <BarChartComponent ref={chartRef} data={chartData} />;
};

export default BarChart;
