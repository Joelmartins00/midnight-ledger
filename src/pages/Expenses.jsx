import defaultCategories from "../data/defaultCategories";
import { useEffect, useState } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Save ONLY when expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const saveEdit = (id) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id
        ? { ...expense, title: editTitle, amount: Number(editAmount) }
        : expense
    );
    setExpenses(updatedExpenses);
    setEditingId(null);
  };

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
  };

  // Filtering logic
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      <h1>Expenses</h1>

      {/* Add Expense Form */}
      <form onSubmit={addExpense} style={styles.form}>
        <input
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          style={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          {defaultCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button}>Add</button>
      </form>

      {/* Search + Filter */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        style={styles.input}
      >
        <option value="All">All Categories</option>
        {defaultCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Expense List */}
      <div style={styles.list}>
        {expenses.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No expenses yet</p>
        ) : (
          filteredExpenses.map((exp) => (
            <div key={exp.id} style={styles.card}>
              <div>
                {editingId === exp.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                    <button
                      onClick={() => saveEdit(exp.id)}
                      style={{
                        background: "#F8F5F2",
                        color: "#000",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px"
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{exp.title}</h3>
                    <p>{exp.category}</p>
                    <p>{exp.date}</p>
                    <p>
                      {localStorage.getItem("currency") || "₦"}
                      {exp.amount}
                    </p>
                  </>
                )}
              </div>
              <div>
                <button
                  onClick={() => deleteExpense(exp.id)}
                  style={styles.delete}
                >
                  Delete
                </button>
                <button
              onClick={() => startEditing(exp)}
              style={styles.edit}
            >
              Edit
            </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: "auto", padding: "30px" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    padding: "10px",
    background: "#141416",
    border: "1px solid #333",
    color: "#fff",
    flex: 1,
  },
  button: {
    padding: "10px 15px",
    background: "#fff",
    border: "none",
    color: "#000",
    cursor: "pointer",
  },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  card: {
    background: "#141416",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #222",
    borderRadius: "8px",
  },
  edit: {
  background: "#EEDFCC",
  color: "#000",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  marginRight: "10px",
  transition: "0.3s",
},

  delete: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #444",
    padding: "8px 14px",
    borderRadius: "8px",
    transition: "0.3s",
  },
};
