import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ExpensePieChart({
  expenses,
}) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals),

        backgroundColor: [
          "#F8F5F2", // Eggshell
          "#D8D2C8", // Greige
          "#FAF9F6", // Salt White
          "#EEDFCC", // Antique White
          "#CFC5B8", // Warm Stone
          "#B8AEA3", // Taupe
          "#A89F94", // Soft Mocha
          "#8D857C", // Deep Greige
          "#726B63", // Charcoal Taupe
          "#EFE7DA", // Ivory Sand
        ],

        borderColor: "#141416",
        borderWidth: 3,
      },
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "350px",
        height: "350px",
        margin: "30px auto 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        Category Distribution
      </h2>

      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#F8F5F2",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}