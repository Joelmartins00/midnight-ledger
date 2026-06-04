import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

  const currency =
    localStorage.getItem("currency") || "₦";

  const totalSpent = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {initials}
        </div>

        <h1>{user.name || "User"}</h1>

        <p>{user.email}</p>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3>Total Spent</h3>
            <p>
              {currency}
              {totalSpent}
            </p>
          </div>

          <div style={styles.statCard}>
            <h3>Transactions</h3>
            <p>{expenses.length}</p>
          </div>
        </div>

        <button
          onClick={logout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    maxWidth: "600px",
    width: "100%",
    background: "#141416",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
  },

  avatar: {
    width: "90px",
    height: "90px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "#EEDFCC",
    color: "#000",
    fontWeight: "bold",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "30px",
  },

  statCard: {
    padding: "20px",
    background: "#1b1b1e",
    borderRadius: "12px",
  },

  logoutButton: {
    marginTop: "30px",
    padding: "12px 20px",
    background: "#EEDFCC",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};