const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const AuthController = {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
      }

      const existente = await UserModel.findByEmail(email);
      if (existente) {
        return res.status(409).json({ erro: 'E-mail já cadastrado' });
      }

      const senha_hash = await bcrypt.hash(senha, 10);
      const usuario = await UserModel.create({ nome, email, senha_hash });
      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
      }

      const usuario = await UserModel.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
      if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } catch (err) {
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  },
};

module.exports = AuthController;
