import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function ExpenseBarChart({
  expenses,
  currency,
}) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      Number(expense.amount);
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: `Amount (${currency})`,
        data: Object.values(categoryTotals),

        backgroundColor: [
          "#EEDFCC",
          "#F8F5F2",
          "#D8D2C8",
          "#C9B79C",
          "#B8B0A5",
          "#A89F94",
        ],

        borderRadius: 8,
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
        width: "100%",
        maxWidth: "350px",
        height: "350px",
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
        }}
      >
        Spending By Category
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}