import ExpensePieChart from "../components/ExpensePieChart";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState("₦");

  useEffect(() => {
    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];

    setExpenses(savedExpenses);

    const savedCurrency =
      localStorage.getItem("currency") || "₦";

    setCurrency(savedCurrency);
  }, []);

  const totalSpent = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const monthlyTotal = monthlyExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : "None";

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <p>
          Monitor spending patterns and
          track financial activity.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Spent</h3>
          <h2>
            {currency}
            {totalSpent}
          </h2>
        </div>

        <div className="stat-card">
          <h3>Transactions</h3>
          <h2>{expenses.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Top Category</h3>
          <h2>{topCategory}</h2>
        </div>

        <div className="stat-card">
          <h3>This Month</h3>
          <h2>
            {currency}
            {monthlyTotal}
          </h2>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Spending By Category</h2>
        <ExpensePieChart expenses={expenses} />
      </div>

      <div className="recent-section">
        <h2>Recent Transactions</h2>
        <div className="transaction-list">
          {expenses.slice(0, 5).map((expense) => (
            <div key={expense.id} className="transaction-item">
              <div>
                <strong>{expense.title}</strong>
                <div>{expense.category}</div>
              </div>
              <div>
                {currency}
                {expense.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

const styles = {
  container: {
    padding: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#141416",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "20px",
    transition: "0.3s",
  },
};