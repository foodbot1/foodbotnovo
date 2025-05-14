import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'npm:stripe@13.2.0';

// ✅ Inicializa o Stripe com a chave secreta do ambiente
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
});

// ✅ Configura os headers CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ✅ Inicia o servidor HTTP
serve(async (req) => {
  // 🔁 Trata requisição CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ✅ Extrai os dados do corpo da requisição
    const { userId, amount, currency, name } = await req.json();

    // ⚠️ Valida se os dados essenciais foram enviados
    if (!userId || !amount || !currency || !name) {
      return new Response(
        JSON.stringify({ error: 'Dados incompletos' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ✅ Cria sessão Stripe com metadata.uid
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        uid: userId, // 🔑 Esse valor será enviado para o webhook
      },
      client_reference_id: userId, // (opcional, mas útil para rastreio)
      success_url: `${Deno.env.get('SITE_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('SITE_URL')}/payment`,
    });

    // ✅ Retorna ID da sessão
    return new Response(
      JSON.stringify({ id: session.id }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
    
  } catch (error) {
    // ❌ Retorna erro
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
