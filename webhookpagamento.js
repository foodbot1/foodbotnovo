const express = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const router = express.Router();

const db = admin.firestore();

router.post('/webhook-pagamento', express.json(), async (req, res) => {
    try {
        const data = req.body.data && req.body.data.id ? req.body.data : null;

        if (!data) {
            return res.status(400).send('Evento inválido');
        }

        const uid = req.body.data.metadata ? req.body.data.metadata.uid : null;

        if (!uid) return res.status(400).send('UID não encontrado no metadata');

        await db.collection('users').doc(uid).set({ status: 'pago' }, { merge: true });

        console.log(`✅ Pagamento confirmado para usuário: ${uid}`);
        res.status(200).send('OK');
    } catch (error) {
        console.error('❌ Erro no webhook:', error);
        res.status(500).send('Erro interno');
    }
});

module.exports = router;
