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
        maxWidth: "500px",
        marginTop: "30px",
      }}
    >
      <Pie data={data} />
    </div>
  );
}