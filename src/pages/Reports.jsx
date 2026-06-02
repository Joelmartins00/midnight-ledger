import { useEffect, useState } from "react";

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

  return (
    <div className="container">
      <h1>Monthly Reports</h1>

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
            <h3>{month}</h3>

            <p>
              {currency}
              {total}
            </p>
          </div>
        )
      )}
    </div>
  );
}