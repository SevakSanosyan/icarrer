import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (password === "12345") {

      localStorage.setItem(
        "admin",
        "true"
      );

      navigate("/admin");

    } else {

      alert("Wrong password");

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "350px",
        }}
      >

        <h1>
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;