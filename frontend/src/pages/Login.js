import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      const { data } = await login(email, senha);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch {
      setErro('E-mail ou senha inválidos.');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sistema de Cadastro</h2>
        <h3 style={styles.subtitle}>Entrar</h3>
        {erro && <p style={styles.erro}>{erro}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          <button style={styles.button} type="submit">Entrar</button>
        </form>
        <p style={styles.link}>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '380px' },
  title: { textAlign: 'center', color: '#1a237e', marginBottom: '0.25rem' },
  subtitle: { textAlign: 'center', color: '#555', fontWeight: 'normal', marginBottom: '1.5rem' },
  input: { display: 'block', width: '100%', padding: '0.6rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', background: '#1a237e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer' },
  erro: { color: 'red', marginBottom: '1rem', textAlign: 'center' },
  link: { textAlign: 'center', marginTop: '1rem' },
};
