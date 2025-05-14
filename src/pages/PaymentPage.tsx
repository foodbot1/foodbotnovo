import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { createPayment } from '../lib/payments';
import { CreditCard, Shield, Clock } from 'lucide-react';

interface PaymentLink {
  id: string;
  name: string;
  amount: number;
  currency: string;
}

export default function PaymentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentLink() {
      if (linkId) {
        const { data, error } = await supabase
          .from('payment_links')
          .select('*')
          .eq('id', linkId)
          .single();

        if (error) {
          console.error('Error fetching payment link:', error);
          navigate('/');
          return;
        }

        setPaymentLink(data);
      }
      setLoading(false);
    }

    fetchPaymentLink();
  }, [linkId, navigate]);

  const handlePayment = async () => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const data = await createPayment(
        user.id,
        paymentLink?.amount || 49.90,
        paymentLink?.name || 'FoodBot Premium'
      );

      // Redirecionar para a URL de pagamento retornada pelo webhook
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 bg-red-600 text-white">
              <h1 className="text-3xl font-bold mb-2">Finalizar Assinatura</h1>
              <p className="text-red-100">
                Comece a automatizar seu restaurante em minutos
              </p>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">
                    {paymentLink?.name || 'FoodBot Premium'}
                  </h2>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    7 dias de teste
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-red-600">
                      R$ {paymentLink?.amount.toFixed(2) || '49,90'}
                    </span>
                    <span className="text-gray-500 ml-2">/semana</span>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 text-green-500 mr-2" />
                      Automação 24 horas por dia
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Shield className="w-5 h-5 text-green-500 mr-2" />
                      Suporte técnico prioritário
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CreditCard className="w-5 h-5 text-green-500 mr-2" />
                      Cancelamento flexível
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handlePayment}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pagar Agora
                  </button>
                  
                  <div className="text-center text-sm text-gray-500">
                    Pagamento processado com segurança
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Informações Importantes</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sua assinatura começará imediatamente após a confirmação do pagamento</li>
                  <li>• Você pode cancelar a qualquer momento sem multas</li>
                  <li>• Suporte técnico disponível 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}