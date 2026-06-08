import { useEffect, useState } from "react";
import ExpenseLineChart from "../components/ExpenseLineChart";

export default function Reports() {
  const [expenses, setExpenses] =
    useState([]);

  const [currency, setCurrency] =
    useState("₦");

  useEffect(() => {
    const savedExpenses =
      JSON.parse(
        localStorage.getItem("expenses")
      ) || [];

    setExpenses(savedExpenses);

    setCurrency(
      localStorage.getItem("currency") ||
        "₦"
    );
  }, []);

  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const month =
      expense.date.substring(0, 7);

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) +
      expense.amount;
  });

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const topCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "N/A"
  ;

  const averageExpense =
    expenses.length > 0
      ? (
          expenses.reduce(
            (sum, expense) =>
              sum + expense.amount,
            0
          ) / expenses.length
        ).toFixed(0)
      : 0;

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (expense) => expense.amount
          )
        )
      : 0;       


  return (
    <div className="container">
      <h1 style= {{marginTop:"10px"}}>
        Monthly Reports
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
            background: "#141416",
          }}
        >
          <h4>Total Expenses</h4>
          <h2>{expenses.length}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
            background: "#141416",
          }}
        >
          <h4>Total Spent</h4>
          <h2>
            {currency}
            {expenses
              .reduce(
                (sum, exp) => sum + exp.amount,
                0
              )
              .toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
            background: "#141416",
          }}
        >
          <h4>Top Category</h4>
          <h2>{topCategory}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
            background: "#141416",
          }}
        >
          <h4>Average Expense</h4>
          <h2>
            {currency}
            {Number(
              averageExpense
            ).toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
            background: "#141416",
          }}
        >
          <h4>Highest Expense</h4>
          <h2>
            {currency}
            {highestExpense.toLocaleString()}
          </h2>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            opacity: 0.8,
          }}
        >
          <h3>No reports available</h3>

          <p>
            Add expenses to generate reports.
          </p>
        </div>
      ) : (
        <>
          {Object.entries(monthlyTotals).map(
          ([month, total]) => (
            <div
              key={month}
              style={{
                marginTop: 20,
                padding: 20,
                border:
                  "1px solid #252525",
                borderRadius: 12,
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                }}
              >
                📅 {month}
              </h3>

              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#EEDFCC",
                }}
              >
                {currency}
                {total.toLocaleString()}
              </p>
            </div>
          ))}

          <ExpenseLineChart
            expenses={expenses}
            currency={currency}
          />

        </>
      )}
    </div>
  );
}