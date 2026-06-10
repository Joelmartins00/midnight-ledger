import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Track Every Expense.
            Understand Every Decision.
          </h1>

          <p>
            A premium expense tracking
            platform designed for clarity,
            control and financial insight.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "30px",
              justifyContent: "center",
            }}
          >
            <Link to="/expenses">
              <button className="hero-button">Add Expenses</button>
            </Link>

            <Link to="/dashboard">
              <button className="hero-button">View Dashboard</button>
            </Link>

            <Link to="/reports">
              <button className="hero-button">View Reports</button>
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "80px",
          background: "#141416",
          border: "1px solid #252525",
          borderRadius: "16px",
          padding: "30px",
        }}
      >
        <h2 
          style={{
            marginBottom: "10px",
            color: "#EEDFCC",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div className="feature-card">
            <h3>1. Add Expenses</h3>
            <p>
              Record every purchase, bill,
              subscription, or payment.
            </p>
          </div>

          <div className="feature-card">
            <h3>2. Track Spending</h3>
            <p>
              Organize expenses by category
              and date.
            </p>
          </div>

          <div className="feature-card">
            <h3>3. Analyze Results</h3>
            <p>
              View charts and reports to
              understand spending habits.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "80px",
          background: "#141416",
          border: "1px solid #252525",
          borderRadius: "16px",
          padding: "30px",
        }}
      >
        <h2 
          style={{
            marginBottom: "10px",
            color: "#EEDFCC",
          }}
        >
          Why Choose Midnight Ledger?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div className="feature-card">
            <h3>📊 Smart Analytics</h3>

            <p>
              Understand spending habits
              through charts, trends,
              and reports.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast & Simple</h3>

            <p>
              Add expenses in seconds
              without complicated setup.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔒 Private</h3>

            <p>
              Your data stays on your
              device using local storage.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "80px",
          background: "#141416",
          border: "1px solid #252525",
          borderRadius: "16px",
          padding: "30px",
        }}
      >
        <h2 
          style={{
            marginBottom: "10px",
            color: "#EEDFCC",
          }}
        >
          What You Can Do
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div className="feature-card">
            <h1>💰</h1>
            <h3>Track Expenses</h3>
          </div>

          <div className="feature-card">
            <h1>📈</h1>
            <h3>View Reports</h3>
          </div>

          <div className="feature-card">
            <h1>🥧</h1>
            <h3>Analyze Charts</h3>
          </div>

          <div className="feature-card">
            <h1>⚙️</h1>
            <h3>Customize Settings</h3>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "80px",
          textAlign: "center",
          padding: "40px 20px",
          border: "1px solid #252525",
          borderRadius: "12px",
          background: "#141416",
        }}
      >
        <h2>
          Take Control of Your Finances Today
        </h2>

        <p
          style={{
            marginTop: "15px",
            opacity: 0.8,
          }}
        >
          Start tracking your spending,
          analyzing your habits, and
          making smarter financial decisions.
        </p>

        <Link to="/expenses">
          <button
            className="hero-button"
            style={{
              marginTop: "25px",
            }}
          >
            Get Started
          </button>
        </Link>
      </section>
    </>
  );
}
