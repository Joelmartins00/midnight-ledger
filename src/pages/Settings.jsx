import { useState, useEffect } from "react";
import { currencies } from "../utils/currencies";

export default function Settings() {
  const [currency, setCurrency] = useState("₦");

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) {
      setCurrency(saved);
    }
  }, []);

  const handleChange = (e) => {
    setCurrency(e.target.value);
    localStorage.setItem("currency", e.target.value);
  };

  const resetExpenses = () => {
    if (window.confirm("Delete all expenses?")) {
      localStorage.removeItem("expenses");
      window.location.reload();
    }
  };

  const exportData = () => {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const csvRows = [["Title", "Amount", "Category", "Date"]];

    expenses.forEach((expense) => {
      csvRows.push([
        expense.title,
        expense.amount,
        expense.category,
        expense.date,
      ]);
    });

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expense-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div style={{ padding: "30px" }}>
        <h1>Settings</h1>

        <h3 style={{ marginTop: "20px" }}>Preferred Currency</h3>

        <select
          value={currency}
          onChange={handleChange}
          style={{
            padding: "10px",
            marginTop: "10px",
            background: "#141416",
            color: "#fff",
            border: "1px solid #333",
          }}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.symbol}>
              {currency.symbol} {currency.name}
            </option>
          ))}
        </select>

        {/* Reset Expenses Button */}
        <button
          onClick={() => {
            if (
              window.confirm(
                "Delete all expenses?"
              )
            ) {
              localStorage.removeItem("expenses");
              window.location.reload();
            }
          }}
          style={{
            marginTop: 20,
            marginLeft: 10,
            padding: "12px 20px",
            borderRadius: "10px",
            border: "1px solid #444",
            background: "transparent",
            color: "#fff",
          }}
        >
          Reset Expenses
        </button>

        {/* Export CSV Button */}
        <button
          onClick={exportData}
          style={{
            marginTop: 20,
            marginLeft: 10,
            padding: "12px 20px",
            borderRadius: "10px",
            border: "1px solid #444",
            background: "transparent",
            color: "#fff",
          }}
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
