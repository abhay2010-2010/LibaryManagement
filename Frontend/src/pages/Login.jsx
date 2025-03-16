import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/reducers/Auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // ✅ Toggle between Login & Register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role for registration
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register"; // ✅ Dynamic API endpoint
      const payload = isLogin ? { username, password } : { username, password, role };

      const res = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      console.log("API Response:", res.data);

      if (isLogin) {
        if (!res.data.token) throw new Error("Token not received!");

        dispatch(loginSuccess({ token: res.data.token, user: { role: res.data.role } }));
        navigate("/dashboard");
      } else {
        alert("Registration successful! Please log in.");
        setIsLogin(true); // ✅ Switch to Login after Registration
      }
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error);
      setError(
        isLogin
          ? "❌ Invalid Credentials. If you are not registered, please sign up."
          : "❌ Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isLogin ? "🔐 Login" : "📝 Register"}</h2>
      <form onSubmit={handleAuth} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {!isLogin && (
          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
        {isLogin ? "📝 New User? Register Here" : "🔑 Already have an account? Login"}
      </button>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "80px",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    width: "100%",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  toggleButton: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Auth;
