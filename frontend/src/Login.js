import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="text-center mb-3">Admin Login</h3>

        <input
          className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;