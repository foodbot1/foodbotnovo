import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import pagamentoRoutes from './routespagamento.js';
import webhookPagamento from './webhookpagamento.js';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', pagamentoRoutes);
app.use('/webhook-pagamento', webhookPagamento);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
