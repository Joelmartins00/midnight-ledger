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
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const categoryIcons = {
    Food: "🍔",
    Transport: "🚗",
    Shopping: "🛒",
    Entertainment: "🎮",
    Utilities: "💡",
    Health: "🏥",
    Education: "📚",
    Other: "📌",
  };

  useEffect(() => {
    setTimeout(() => {
      const savedExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

      setExpenses(savedExpenses);

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      setMessage("Please fill all fields and select a category.");

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
    setShowForm(false);
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
      <h2>Expenses</h2>

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

      <div
        style={{
          background: "#141416",
          border: "1px solid #222",
          borderRadius: "16px",
          padding: "14px",
          marginBottom: "5px",
          marginTop: "10px",
        }}
      >
        <h3>Total Expenses</h3>

        <h1>
          {localStorage.getItem("currency") || "₦"}
          {expenses.reduce(
            (sum, exp) => sum + exp.amount,
            0
          )}
        </h1>

        <p>
          {expenses.length} transaction(s)
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        style={styles.toggleButton}
      >
        {showForm ? "− Hide Expense Form" : "+ Add Expense"}
      </button>

      {showForm && (
        <div style={styles.formCard}>
          <h2
            style={{
              marginBottom: "20px",
              color: "#EEDFCC",
            }}
          >
            Add New Expense
          </h2>

          <div>
            <form onSubmit={addExpense} style={styles.form}>
              <>
                <label
                  style={{
                    fontSize: "14px",
                    marginBottom: "1px",
                    display: "block",
                  }}
                >
                  Expense Title
                </label>

                <input
                  placeholder="e.g. Lunch at Restaurant"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={styles.input}
                />
              </>

              <>
                <label
                  style={{
                    fontSize: "14px",
                    marginBottom: "5px",
                    display: "block",
                  }}
                >
                  Amount
                </label>

                <input
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  style={styles.input}
                />
              </>

              <label
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.input}
              >
                <option value="">
                  Select Category
                </option>

                {defaultCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
              />

              <button style={styles.button}>
                Add Expense
              </button>
            </form>
          </div>

          
        </div>
      )}

      {expenses.length > 0 && (
            <Link to="/dashboard">
              <button
                style={{
                  marginTop: "1px",
                  marginBottom: "25px",
                  padding: "12px 20px",
                  background: "#EEDFCC",
                  color: "#000",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "700",
                  width: "100%",
                  maxWidth: "250px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 0 10px rgba(238,223,204,0.5), 0 0 20px rgba(238,223,204,0.3)",
                  transition: "0.3s",
                }}
              >
                View Dashboard →
              </button>
            </Link>
          )}

      {/* Search + Filter */}
      
      {expenses.length > 0 && (
        <>
          <div style={styles.filterCard}>
          <h2
            style={{
              marginBottom: "15px",
              color: "#EEDFCC",
            }}
          >
            Search & Filter
          </h2>

          <input
            type="text"
            placeholder="Search by title..."
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
        </div>
        </>
      )}

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
                      placeholder="Expense title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{
                        ...styles.input,
                        marginBottom: "10px",
                      }}
                    />

                    <input
                      type="number"
                      placeholder="Amount"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      style={{
                        ...styles.input,
                        marginBottom: "10px",
                      }}
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
                    <h3
                      style={{
                        margin: 0,
                      }}
                    >
                      {exp.title}
                    </h3>

                    <span
                      style={{
                        background: "#010101",
                        color: "#ffffff",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        display: "inline-block",
                        marginTop: "5px",
                      }}
                    >
                      {categoryIcons[exp.category] || "📌"} {exp.category}
                    </span>

                    <p
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        margin: "8px 0",
                      }}
                    >
                      {localStorage.getItem("currency") || "₦"}
                      {exp.amount.toLocaleString()}
                    </p>

                    <p
                      style={{
                        opacity: 0.7,
                        fontSize: "0.9rem",
                        margin: 0,
                      }}
                    >
                      {formatDate(exp.date)}
                    </p>
                  </>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => startEditing(exp)}
                  style={styles.edit}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExpense(exp.id)}
                  style={styles.delete}
                >
                  Delete
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
  formCard: {
    background: "#141416",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "15px",
    marginTop: "15px",
  },
  toggleButton: {
    width: "100%",
    padding: "14px",
    background: "#EEDFCC",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "15px",
    transition: "0.3s",
  },
  filterCard: {
    background: "#141416",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "15px",
  },
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
    borderRadius: "10px",
    fontWeight: "600",
    transition: "0.3s",
  },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  card: {
    background: "#141416",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    border: "1px solid #222",
    borderRadius: "16px",
    marginTop: "10px",
    transition: "0.3s",
  },
  
  edit: {
    background: "#EEDFCC",
    color: "#000",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    marginRight: "3px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  delete: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #444",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    marginRight: "6px",
  },
};
