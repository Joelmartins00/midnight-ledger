import defaultCategories from "../data/defaultCategories";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const savedExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

      setExpenses(savedExpenses);

      setLoading(false);
    }, 1000);
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) {
      setMessage("Please enter both title and amount.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

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
    setMessage("Expense added successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((exp) => exp.id !== id)
    );

    setMessage("Expense deleted.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const saveEdit = (id) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id
        ? { ...expense, title: editTitle, amount: Number(editAmount) }
        : expense
    );
    setExpenses(updatedExpenses);
    setEditingId(null);

    setMessage("Expense updated successfully.");

    setTimeout(() => {
      setMessage("");
      }, 3000);
  };

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
        }}
      >
        <h2>Loading Expenses...</h2>
        <p>Please wait</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Expenses</h1>

      {message && (
        <div
          style={{
            background: "#EEDFCC",
            color: "#000",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

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

      {expenses.length > 0 && (
        <Link to="/dashboard">
          <button
            style={{
              padding: "12px 20px",
              background: "#EEDFCC",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              marginBottom: "20px",
              cursor: "pointer",
              fontWeight: "600",
              marginRight: "350px",
            }}
          >
            View Dashboard →
          </button>
        </Link>
      )}

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
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              opacity: 0.8,
            }}
          >
            <h3>No expenses yet</h3>

            <p>
              Add your first expense to start
              tracking your spending.
            </p>
          </div>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
    marginTop: "10px",
  },
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
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    border: "1px solid #222",
    borderRadius: "12px",
    marginTop: "10px",
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
    marginRight: "6px",
  },
};
