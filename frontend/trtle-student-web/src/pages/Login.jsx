import React, { useState } from "react";
import "./Login.css"; // CSS separado

const mockUsers = [
  { id: 1, user: "rebecca", password: "123" },
  { id: 2, user: "jaehyun", password: "456" },
];

const Login = ({ onLogin }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const foundUser = mockUsers.find(
      (user) => user.user.toLowerCase() === usernameInput.toLowerCase()
    );

    if (foundUser && foundUser.password === passwordInput) {
      alert(`Login bem-sucedido! Bem-vindo(a), ${foundUser.user}!`);
      if (onLogin) onLogin(); // chama função passada pelo App
    } else {
      setError("Nome de utilizador ou palavra-passe inválidos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Usuário"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Senha"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
