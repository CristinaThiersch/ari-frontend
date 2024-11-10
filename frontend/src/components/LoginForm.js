import { Cookie } from 'phosphor-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Entrei no logout");
  };

  // Verifique se o token existe, e se existir, faça o logout
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("OPa");
    
    handleLogout(); // Se houver token, faz logout
    
  }, []); // O array vazio faz a verificação acontecer apenas uma vez, ao carregar o componente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login falhou');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.id);
      navigate('/users'); // Redireciona para a página de usuários
    } catch (error) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
