const UserModel = require('../models/userModel');

const UserController = {
  async getAll(req, res) {
    try {
      const usuarios = await UserModel.findAll();
      return res.json(usuarios);
    } catch {
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
  },

  async getById(req, res) {
    try {
      const usuario = await UserModel.findById(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.json(usuario);
    } catch {
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
  },

  async update(req, res) {
    try {
      const { nome, email } = req.body;
      if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
      }
      const usuario = await UserModel.update(req.params.id, { nome, email });
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
      return res.json(usuario);
    } catch {
      return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  },

  async delete(req, res) {
    try {
      await UserModel.delete(req.params.id);
      return res.status(204).send();
    } catch {
      return res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
  },
};

module.exports = UserController;
