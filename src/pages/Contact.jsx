export default function Contact() {
  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px", marginTop: "10px", }}>
        Contact Us
      </h1>

      <p
        style={{
          marginBottom: "30px",
          opacity: 0.8,
        }}
      >
        Have questions, feedback, or suggestions?
        We'd love to hear from you.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#141416",
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
          }}
        >
          <h3>📧 Email</h3>
          <p>support@midnightledger.com</p>
        </div>

        <div
          style={{
            background: "#141416",
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
          }}
        >
          <h3>📞 Phone</h3>
          <p>+234 805 354 5235</p>
        </div>

        <div
          style={{
            background: "#141416",
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
          }}
        >
          <h3>📍 Address</h3>
          <p>P.M.B. 30678, Ibadan, Oyo State, Nigeria</p>
        </div>

        <div
          style={{
            background: "#141416",
            padding: "20px",
            border: "1px solid #252525",
            borderRadius: "12px",
          }}
        >
          <h3>🌙 Midnight Ledger</h3>
          <p>
            Helping users track expenses,
            understand spending habits,
            and make smarter financial
            decisions.
          </p>
        </div>
      </div>
    </div>
  );
}