import express from 'express'; // 👈 adicione essa linha
import { Router } from 'express';
import Stripe from 'stripe';
import admin from 'firebase-admin';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Erro ao validar webhook:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const uid = session.metadata.uid;

    // Salvar no Firebase Firestore
    const db = admin.firestore();
    await db.collection('usuarios').doc(uid).set({ status: 'pago' }, { merge: true });
    console.log(`✅ UID ${uid} salvo como pago.`);
  }

  res.status(200).send('Webhook recebido com sucesso!');
});

export default router;
