export default function About() {
  return (
    <div className="container">
      <h1
        style={{
          marginBottom: "30px",
          marginTop: "12px",
        }}
      >
        About Midnight Ledger
      </h1>

      <div
        style={{
          background: "#141416",
          padding: "20px",
          border: "1px solid #252525",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>🌙 Project Overview</h2>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          Midnight Ledger is a personal expense tracking and budgeting application that allows users to manually record their daily spending, organize expenses by category, and review their financial activity through reports and charts. It serves as a digital expense diary, helping users develop better spending habits and maintain greater control over their finances.
        </p>
      </div>

      <div
        style={{
          background: "#141416",
          padding: "20px",
          border: "1px solid #252525",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>🎯 Mission</h2>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          To help individuals develop
          better financial habits by
          providing a simple, intuitive,
          and accessible platform for
          tracking expenses and managing
          personal finances.
        </p>
      </div>

      <div
        style={{
          background: "#141416",
          padding: "20px",
          border: "1px solid #252525",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>🚀 Vision</h2>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          To become a trusted personal
          finance companion that empowers
          users to make smarter spending
          decisions and achieve long-term
          financial stability.
        </p>
      </div>

      <div
        style={{
          background: "#141416",
          padding: "20px",
          border: "1px solid #252525",
          borderRadius: "12px",
        }}
      >
        <h2>✨ Key Features</h2>

        <ul
          style={{
            marginTop: "15px",
            lineHeight: "2",
          }}
        >
          <li>📊 Interactive Dashboard</li>
          <li>💰 Expense Tracking</li>
          <li>📈 Financial Reports</li>
          <li>🥧 Line, Pie & Bar Charts</li>
          <li>📉 Spending Trends</li>
          <li>👤 User Profiles</li>
          <li>⚙️ Currency Preferences</li>
        </ul>
      </div>
    </div>
  );
}