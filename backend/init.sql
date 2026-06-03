-- Script de criação do banco de dados
-- Execute: psql -U postgres -d scu_db -f init.sql

CREATE TABLE IF NOT EXISTS usuarios (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  senha_hash  VARCHAR(255) NOT NULL,
  criado_em   TIMESTAMP DEFAULT NOW()
);
