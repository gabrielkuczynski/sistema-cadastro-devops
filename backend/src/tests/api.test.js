const request = require('supertest');
const app = require('../app');

// Mock do banco de dados para testes
jest.mock('../models/userModel', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const UserModel = require('../models/userModel');

// Token JWT de teste
const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'test_secret';
const token = jwt.sign({ id: 1, email: 'teste@teste.com' }, 'test_secret');

describe('Auth Routes', () => {
  test('POST /api/auth/register - deve retornar 400 se faltar campos', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'a@a.com' });
    expect(res.status).toBe(400);
  });

  test('POST /api/auth/login - deve retornar 400 se faltar campos', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/auth/register - deve criar usuário com dados válidos', async () => {
    UserModel.findByEmail.mockResolvedValue(null);
    UserModel.create.mockResolvedValue({ id: 1, nome: 'Teste', email: 'teste@teste.com', criado_em: new Date() });

    const res = await request(app).post('/api/auth/register').send({
      nome: 'Teste', email: 'teste@teste.com', senha: '123456'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'teste@teste.com');
  });
});

describe('User Routes', () => {
  test('GET /api/users - deve retornar 401 sem token', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });

  test('GET /api/users - deve retornar lista com token válido', async () => {
    UserModel.findAll.mockResolvedValue([{ id: 1, nome: 'Teste', email: 'teste@teste.com' }]);
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/users/:id - deve retornar 404 se não encontrado', async () => {
    UserModel.findById.mockResolvedValue(null);
    const res = await request(app)
      .get('/api/users/999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  test('PUT /api/users/:id - deve retornar 400 se faltar campos', async () => {
    const res = await request(app)
      .put('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Só nome' });
    expect(res.status).toBe(400);
  });

  test('DELETE /api/users/:id - deve retornar 204', async () => {
    UserModel.delete.mockResolvedValue();
    const res = await request(app)
      .delete('/api/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});

describe('Health Check', () => {
  test('GET /health - deve retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
