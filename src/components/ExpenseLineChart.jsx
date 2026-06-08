import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ExpenseLineChart({
  expenses,
  currency,
}) {
  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const month =
      expense.date.substring(0, 7);

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) +
      Number(expense.amount);
  });

  const data = {
    labels: Object.keys(monthlyTotals),

    datasets: [
      {
        label: `Monthly Spending (${currency})`,

        data: Object.values(monthlyTotals),

        borderColor: "#EEDFCC",

        backgroundColor:
          "rgba(238,223,204,0.2)",

        tension: 0.35,

        fill: true,

        pointRadius: 5,

        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#F8F5F2",
        },

        grid: {
          color: "#222",
        },
      },

      y: {
        ticks: {
          color: "#F8F5F2",
        },

        grid: {
          color: "#222",
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",

        padding: "20px",

        border: "1px solid #252525",

        borderRadius: "12px",

        background: "#141416",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Monthly Spending Trend
      </h2>

      <div
        style={{
          height: "350px",
        }}
      >
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}