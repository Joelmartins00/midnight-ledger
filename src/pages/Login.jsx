export default function Login() {
  return (
    <div style={styles.container}>
      <h1>Login</h1>

      <input placeholder="Email" style={styles.input} />
      <input placeholder="Password" style={styles.input} type="password" />

      <button style={styles.button}>Login</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    background: "#141416",
    border: "1px solid #333",
    color: "#fff",
  },
  button: {
    padding: "10px",
    background: "#fff",
    color: "#000",
    border: "none",
  },
};