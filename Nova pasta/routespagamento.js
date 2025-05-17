import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Instancia o Stripe com a chave secreta do .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get('/pagamento', async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).send('UID ausente');

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Acesso ao FoodBot Pro'
          },
          unit_amount: 3999, // 💰 R$39,99 (em centavos)
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: { uid },
      success_url: 'https://soft-capybara-5d0d21.netlify.app/sucesso',
      cancel_url: 'https://soft-capybara-5d0d21.netlify.app/cancelado'
    });

    res.redirect(session.url);
  } catch (err) {
    console.error('Erro ao criar sessão Stripe:', err);
    res.status(500).send('Erro ao criar pagamento');
  }
});

export default router;
