import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { MercadoPagoConfig, Preference } from 'npm:mercadopago@2.0.8';

const client = new MercadoPagoConfig({ 
  accessToken: Deno.env.get('MERCADOPAGO_ACCESS_TOKEN') ?? ''
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, amount, description } = await req.json();

    const preference = new Preference(client);
    const result = await preference.create({
      items: [
        {
          title: description,
          unit_price: amount,
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${Deno.env.get('SITE_URL')}/success`,
        failure: `${Deno.env.get('SITE_URL')}/payment`
      },
      auto_return: 'approved',
      external_reference: userId,
    });

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
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