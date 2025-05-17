// index.js
const express = require('express');
const path = require('path');
const pagamentoRoutes = require('./routespagamento.js');
const webhookPagamento = require('./webhookpagamento.js');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require('./serviceAccountKey.json')) // coloque seu arquivo
    });
}

// Middleware para ler JSON (necessário para o webhook)
app.use(express.json());

// Rota principal → pode ser sua landing page ou index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota do botão pagar (gera link Mercado Pago)
app.use('/', pagamentoRoutes);

// Rota do webhook Mercado Pago
app.use('/', webhookPagamento);

// Starta o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
