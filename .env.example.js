// ================================
// BACKEND CLEAN PARA RODAR NO RAILWAY
// ================================

// 📁 Estrutura recomendada:
// - backend/
//    |- index.js
//    |- package.json
//    |- .env.example
//    |- Dockerfile

// =================================
// ✅ 1. index.js
// =================================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simulação de rota para webhook Mercado Pago / Stripe
app.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.status(200).send("OK");
});

// Simulação de rota para verificar status no Firebase
app.get("/status/:userid", (req, res) => {
  const { userid } = req.params;
  res.json({ user: userid, access: true });
});

app.listen(PORT, () => {
  console.log(`✅ Backend API rodando na porta ${PORT}`);
});

// =================================
// ✅ 2. package.json
// =================================
// Salve esse conteúdo como package.json
/*
{
  "name": "foodbot-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2"
  },
  "engines": {
    "node": "18.x"
  }
}
*/

// =================================
// ✅ 3. Dockerfile
// =================================
// Salve esse conteúdo como Dockerfile
/*
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
*/

// =================================
// ✅ 4. .env.example
// =================================
// Salve como .env.example
/*
PORT=3000
*/
