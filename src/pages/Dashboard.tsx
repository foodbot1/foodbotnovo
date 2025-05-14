import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ExtensionDownload from '../components/ExtensionDownload';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] = React.useState<any>(null);

  React.useEffect(() => {
    async function getSubscription() {
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      setSubscription(data);
    }

    if (user) {
      getSubscription();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Status da Assinatura</h2>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{' '}
                <span className={subscription?.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                  {subscription?.status === 'active' ? 'Ativa' : 'Inativa'}
                </span>
              </p>
              {subscription?.active_until && (
                <p>
                  <strong>Válida até:</strong>{' '}
                  {new Date(subscription.active_until).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>

          <ExtensionDownload isSubscriptionActive={subscription?.status === 'active'} />
        </div>
      </div>
    </div>
  );
}