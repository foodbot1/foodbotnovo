import { supabase } from './supabase';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

export const createPayment = async (userId: string, amount: number, description: string) => {
  try {
    // Criar assinatura
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .insert([{
        user_id: userId,
        status: 'pending',
      }])
      .select()
      .single();

    if (subError) throw subError;

    // Enviar dados para o webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription_id: subscription.id,
        user_id: userId,
        amount,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao processar pagamento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};