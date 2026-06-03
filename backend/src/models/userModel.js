const pool = require('./db');

const UserModel = {
  async findAll() {
    const result = await pool.query(
      'SELECT id, nome, email, criado_em FROM usuarios ORDER BY criado_em DESC'
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      'SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async create({ nome, email, senha_hash }) {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email, criado_em',
      [nome, email, senha_hash]
    );
    return result.rows[0];
  },

  async update(id, { nome, email }) {
    const result = await pool.query(
      'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email, criado_em',
      [nome, email, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  },
};

module.exports = UserModel;
