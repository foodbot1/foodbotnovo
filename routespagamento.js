
const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const router = express.Router();

const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-1957632896627780-042222-e24e39bce5e40f2e733f7fd93eff3f61-1913227721'
});

router.get('/pagamento', async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).send('UID ausente');

  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: 'Acesso ao FoodBot Pro',
            unit_price: 50,
            quantity: 1,
            currency_id: 'BRL'
          }
        ],
        metadata: { uid },
        back_urls: {
          success: 'https://loquacious-licorice-d1fccc.netlify.app/sucesso',
          failure: 'https://loquacious-licorice-d1fccc.netlify.app/erro'
        },
        auto_return: 'approved'
      }
    });

    res.redirect(response.init_point);
  } catch (err) {
    console.error('Erro ao criar preferência:', err);
    res.status(500).send('Erro ao criar pagamento');
  }
});

module.exports = router;
