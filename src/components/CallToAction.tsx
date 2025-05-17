import React from 'react';
import { ArrowRight, CheckCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const handleStartClick = async () => {
    if (!user) {
      await signIn();
    }

    if (user) {
      try {
        const response = await fetch(`https://foodbot-production.up.railway.app/pagamento?uid=${user.id}`);
        const data = await response.text(); // redireciona para o checkout do Stripe
        window.location.href = data;
      } catch (error) {
        console.error('Erro ao iniciar pagamento:', error);
        alert('Erro ao redirecionar para o pagamento. Tente novamente.');
      }
    }
  };

  return (
    <section id="trial" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 bg-red-600 text-white text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl font-bold italic">FoodBot</span>
              <div className="ml-2 bg-green-600 text-white text-sm px-3 py-1 rounded">
                Pedido pronto
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              VOCÊ ESTÁ NO iFOOD, MAS ESTÁ VENDENDO PRA VALER?
            </h2>
            <p className="text-xl mb-6">
              O iFood é uma arena de alta competição.
              Só sobrevive quem é rápido, consistente e inteligente.
            </p>
          </div>
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Com o FoodBot, você investe apenas R$ 49,90 mensais e:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Aumenta sua visibilidade no algoritmo do iFood</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Recebe mais pedidos automaticamente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Economiza em folha de pagamento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Constrói volume de vendas como os grandes players</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                <CreditCard className="text-red-600 mr-2" size={24} />
                <h4 className="text-lg font-bold">Dados para Pagamento</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Banco:</strong> Itaú (341)</p>
                <p><strong>Agência:</strong> 0123</p>
                <p><strong>Conta:</strong> 12345-6</p>
                <p><strong>Tipo:</strong> Conta Corrente</p>
                <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                <p><strong>Titular:</strong> FOODBOT TECNOLOGIA LTDA</p>
                <p><strong>PIX:</strong> financeiro@foodbot.com.br</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleStartClick}
                className="inline-block bg-red-600 text-white py-4 px-8 rounded-md font-bold text-xl hover:bg-red-700 transition-colors transform hover:scale-105 duration-200 mb-4 w-full sm:w-auto"
              >
                COMEÇAR AGORA <ArrowRight size={20} className="inline ml-2" />
              </button>
              <p className="text-sm text-gray-500">
                Instalação em menos de 2 minutos
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-bold italic">FoodBot</span>
              <div className="ml-2 bg-green-600 text-white text-sm px-3 py-1 rounded">
                Pedido pronto
              </div>
            </div>
            <p className="text-center font-bold text-gray-800">
              RESUMÃO: FoodBot = Mais pedidos no iFood + Mais lucro + Zero custo com CLT — tudo isso por apenas R$ 49,90 mensais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
