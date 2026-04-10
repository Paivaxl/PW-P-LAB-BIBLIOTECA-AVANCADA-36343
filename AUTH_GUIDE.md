# 🔐 Guia de Autenticação - API Biblioteca

Este guia mostra como utilizar as rotas de autenticação e como acessar as rotas protegidas da API.

---

## 📌 Novo Sistema de Autenticação

O sistema agora utiliza **JWT (JSON Web Token)** para autenticação. Todas as rotas de autores e livros estão protegidas e requerem um token válido.

---

## 🚀 Como Começar

### 1️⃣ Signup (Registro)

**Rota:** `POST /auth/signup`

Registar um novo utilizador.

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123",
  "name": "Nome do Utilizador"
}
```

**Response (Sucesso):**
```json
{
  "message": "Utilizador registado com sucesso",
  "data": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Nome do Utilizador",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2️⃣ Signin (Login)

**Rota:** `POST /auth/signin`

Fazer login com as credenciais registadas.

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Response (Sucesso):**
```json
{
  "message": "Login realizado com sucesso",
  "data": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Nome do Utilizador",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🔑 Usar o Token

Após fazer login ou registar, receberá um **token JWT**. Este token deve ser enviado em todas as requisições às rotas protegidas.

### Header Necessário:
```
Authorization: Bearer <seu_token_aqui>
```

---

## 📚 Exemplos de Rotas Protegidas

### Listar Autores

**Rota:** `GET /authors`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Camões",
    "nationality": "Portugal",
    "birthYear": 1524
  },
  {
    "id": 2,
    "name": "Fernando Pessoa",
    "nationality": "Portugal",
    "birthYear": 1888
  }
]
```

---

### Criar um Novo Autor

**Rota:** `POST /authors`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Novo Autor",
  "nationality": "Portugal",
  "birthYear": 1990
}
```

---

### Listar Livros

**Rota:** `GET /books`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Criar um Novo Livro

**Rota:** `POST /books`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Novo Livro",
  "year": 2024,
  "genre": "Ficção",
  "authorId": 1
}
```

---

## ⚠️ Erros Comuns

### 1. Token não fornecido
```json
{
  "error": "Token não fornecido ou formato inválido"
}
```
**Solução:** Incluir o header `Authorization: Bearer <token>`

### 2. Token inválido ou expirado
```json
{
  "error": "Token inválido ou expirado"
}
```
**Solução:** Fazer novo signin para obter um novo token

### 3. Email já registado
```json
{
  "error": "Email já está registado"
}
```
**Solução:** Usar um email diferente ou fazer signin

### 4. Email ou password inválidos
```json
{
  "error": "Email ou password inválidos"
}
```
**Solução:** Verificar as credenciais inseridas

---

## 🧪 Testar no Postman

### 1. Criar uma Requisição de Signup
- **Método:** POST
- **URL:** `http://localhost:4242/auth/signup`
- **Body (raw - JSON):**
```json
{
  "email": "test@example.com",
  "password": "senhaSegura123",
  "name": "João Silva"
}
```

### 2. Copiar o Token Recebido

Na resposta, copie o valor do campo `token`.

### 3. Criar uma Requisição para Listar Autores
- **Método:** GET
- **URL:** `http://localhost:4242/authors`
- **Headers:**
  - **Key:** `Authorization`
  - **Value:** `Bearer <cole-seu-token-aqui>`

---

## 📝 Variáveis de Ambiente

Adicionar ao `.env`:

```env
JWT_SECRET="sua-chave-secreta-super-segura-aqui-mude-em-producao"
```

> ⚠️ **Importante:** Mude a `JWT_SECRET` em produção por uma chave muito segura e única!

---

## 🔒 Segurança

- As senhas são armazenadas com **hash bcrypt**
- Os tokens expiram em **24 horas**
- Todos os dados sensíveis só são transmitidos por HTTPS em produção

---

## 📚 Rotas da API

| Método | Rota | Proteção | Descrição |
|--------|-----|----------|-----------|
| POST | `/auth/signup` | ❌ | Registar novo utilizador |
| POST | `/auth/signin` | ❌ | Fazer login |
| GET | `/authors` | ✅ | Listar autores |
| GET | `/authors/:id` | ✅ | Obter autor por ID |
| POST | `/authors` | ✅ | Criar novo autor |
| PUT | `/authors/:id` | ✅ | Atualizar autor |
| DELETE | `/authors/:id` | ✅ | Remover autor |
| GET | `/books` | ✅ | Listar livros |
| GET | `/books/:id` | ✅ | Obter livro por ID |
| POST | `/books` | ✅ | Criar novo livro |
| PUT | `/books/:id` | ✅ | Atualizar livro |
| DELETE | `/books/:id` | ✅ | Remover livro |

---

## 🎯 Próximos Passos

1. Iniciar o servidor: `npm run dev`
2. Registar um novo utilizador em `/auth/signup`
3. Fazer login em `/auth/signin`
4. Usar o token em todas as requisições às rotas protegidas
