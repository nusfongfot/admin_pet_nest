import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

type Props = {
  lineGraph: any[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      //   text: "Chart.js Line Chart",
    },
  },
};

const labels = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];

export function MyLineChart({ lineGraph }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue of week ($)",
        data: lineGraph,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
