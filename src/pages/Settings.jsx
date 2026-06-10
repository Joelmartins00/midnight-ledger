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

        <div
          style={{
            marginTop: "20px",
            marginBottom: "25px",
            padding: "15px",
            background: "#141416",
            border: "1px solid #252525",
            borderRadius: "12px",
          }}
        >
          <h3>Application Version</h3>

          <p
            style={{
              opacity: 0.8,
              marginTop: "8px",
            }}
          >
            Midnight Ledger v1.0.0
          </p>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#141416",
            border: "1px solid #252525",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3>💱 Preferred Currency</h3>

          <select
            value={currency}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginTop: "15px",
              background: "#141416",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            {currencies.map((currency) => (
              <option
                key={currency.code}
                value={currency.symbol}
              >
                {currency.symbol} {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#141416",
            border: "1px solid #252525",
            borderRadius: "12px",
            marginTop: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            ⚙️ Data Management
          </h3>

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
              padding: "12px 20px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            Reset Expenses
          </button>

          <button
            onClick={exportData}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#EEDFCC",
              color: "#000",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
