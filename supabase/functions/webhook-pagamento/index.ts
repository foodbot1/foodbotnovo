// 📦 Criar link de pagamento com Mercado Pago
// Execute com: node criar_pagamento.js

import mercadopago from 'mercadopago';

// 🔐 Use sua Access Token de PRODUÇÃO
mercadopago.configure({
  access_token: 'APP_USR-1957632896627780-042222-e24e39bce5e40f2e733f7fd93eff3f61-1913227721',
});

async function criarPagamento() {
  const preference = {
    items: [
      {
        title: 'Acesso ao FoodBot Pro',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: 50.0,
      },
    ],
    metadata: {
      uid: 'vitor123', // ou dinamicamente: req.query.uid
    },
    back_urls: {
      success: 'https://foodbot.app/sucesso',
      failure: 'https://foodbot.app/erro',
      pending: 'https://foodbot.app/pendente',
    },
    notification_url: 'https://foodbot-webhook-production.up.railway.app/webhook-pagamento',
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log('✅ Link gerado:', response.body.init_point);
  } catch (error) {
    console.error('❌ Erro ao criar pagamento:', error);
  }
}

criarPagamento();
