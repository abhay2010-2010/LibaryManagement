import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/reducers/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css"; // ✅ Moved styles to external file for clean structure

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { username, password } : { username, password, role };

      const res = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (isLogin) {
        if (!res.data.token) throw new Error("Token not received!");
        dispatch(loginSuccess({ token: res.data.token, user: { role: res.data.role } }));
        toast.success("🎉 Login Successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.success("✅ Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error);
      setError(isLogin ? "❌ Incorrect username or password. Try again." : "❌ Registration failed. Try again.");
      toast.error("❌ Authentication Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-container">
        <h2 className="auth-title">{isLogin ? "🔐 Welcome! Explore Library" : "📝 Create Account"}</h2>
        <form onSubmit={handleAuth} className="auth-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          {!isLogin && (
            <select value={role} onChange={(e) => setRole(e.target.value)} className="auth-select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-button">
          {isLogin ? "📝 New User? Sign Up" : "🔑 Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
