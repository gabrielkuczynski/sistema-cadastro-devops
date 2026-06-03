import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api';

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => { carregarUsuarios(); }, []);

  async function carregarUsuarios() {
    try {
      const { data } = await getUsers();
      setUsuarios(data);
    } catch {
      setErro('Erro ao carregar usuários.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Confirmar exclusão?')) return;
    try {
      await deleteUser(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch {
      setErro('Erro ao excluir usuário.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Usuários Cadastrados</h2>
        <button style={styles.logout} onClick={handleLogout}>Sair</button>
      </div>
      {erro && <p style={styles.erro}>{erro}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>E-mail</th>
            <th style={styles.th}>Cadastrado em</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td style={styles.td}>{u.id}</td>
              <td style={styles.td}>{u.nome}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>{new Date(u.criado_em).toLocaleDateString('pt-BR')}</td>
              <td style={styles.td}>
                <button style={styles.btnDelete} onClick={() => handleDelete(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>Nenhum usuário cadastrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { color: '#1a237e' },
  logout: { background: '#c62828', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' },
  erro: { color: 'red' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  th: { background: '#1a237e', color: '#fff', padding: '0.75rem 1rem', textAlign: 'left' },
  td: { padding: '0.75rem 1rem', borderBottom: '1px solid #eee' },
  btnDelete: { background: '#e53935', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.3rem 0.7rem', cursor: 'pointer' },
};
