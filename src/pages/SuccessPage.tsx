import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const payment_id = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 rounded-full p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Pagamento Aprovado!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sua assinatura do FoodBot está ativa.
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecionando para o dashboard em alguns segundos...
          </div>
        </div>
      </div>
    </div>
  );
}