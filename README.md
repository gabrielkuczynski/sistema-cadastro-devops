# Sistema de Cadastro de Usuários (SCU)

Aplicação web full-stack com pipeline CI/CD e infraestrutura como código.

## Stack
- **Front-end:** React.js
- **Back-end:** Node.js + Express + JWT
- **Banco de dados:** PostgreSQL
- **CI/CD:** GitHub Actions
- **IaC:** Terraform (AWS)

## Estrutura
```
sistema-cadastro-devops/
├── frontend/        # Aplicação React.js
├── backend/         # API REST Node.js
├── infra/           # Scripts Terraform (AWS)
└── .github/
    └── workflows/   # Pipeline GitHub Actions
```

## Como executar localmente

### Back-end
```bash
cd backend
npm install
cp .env.example .env   # configure as variáveis
npm run dev
```

### Front-end
```bash
cd frontend
npm install
npm start
```

## Infraestrutura (Terraform)
```bash
cd infra
terraform init
terraform plan
terraform apply
```

## Pipeline CI
O pipeline roda automaticamente a cada push nas branches `main` e `develop`.
