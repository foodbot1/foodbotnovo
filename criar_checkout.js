// criar_checkout.js
const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

async function criarCheckout() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Acesso ao FoodBot Pro',
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      uid: 'vitor123',
    },
    success_url: 'https://foodbot.app/sucesso',
    cancel_url: 'https://foodbot.app/erro',
  });

  console.log('✅ Checkout criado:', session.url);
}

criarCheckout().catch(console.error);
