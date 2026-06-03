import ExpensePieChart from "../components/ExpensePieChart";
import ExpenseBarChart from "../components/ExpenseBarChart";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState("₦");
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];

    setExpenses(savedExpenses);

    const savedCurrency =
      localStorage.getItem("currency") || "₦";

    setCurrency(savedCurrency);
  }, []);

  // ✅ Example addExpense function with confirmation + redirect
  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    const goDashboard = window.confirm(
      "Expense added successfully.\n\nView Dashboard now?"
    );

    if (goDashboard) {
      navigate("/dashboard");
    }
  };

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

  if (expenses.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h2>No Expense Data Yet</h2>
        <p>
          Add some expenses first to unlock your dashboard analytics.
        </p>
        <Link to="/expenses">
          <button className="add-button">
            Add Expenses
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <p>
          View and monitor spending patterns and track financial activity.
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

      <div className="charts-grid">
        <ExpensePieChart
          expenses={expenses}
          currency={currency}
        />

        <ExpenseBarChart
          expenses={expenses}
          currency={currency}
        />
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
