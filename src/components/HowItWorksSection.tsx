import React from 'react';
import { AlertCircle, CheckCircle, Timer } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          COMO <span className="text-red-600">FUNCIONA</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-600 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">
              1. Pedido novo
            </h3>
            <p className="text-gray-600 text-center">
              O iFood envia um novo pedido para o seu restaurante e coloca
              automaticamente no status "Em Preparo".
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-600 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
              <Timer size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">
              2. FoodBot detecta
            </h3>
            <p className="text-gray-600 text-center">
              O FoodBot detecta automaticamente o novo pedido no painel do iFood
              sem interferir no seu fluxo de trabalho.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-600 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">
              3. Pedido Pronto!
            </h3>
            <p className="text-gray-600 text-center">
              Em menos de 1 segundo, o botão "Pedido Pronto" é apertado,
              mostrando ao iFood que seu restaurante é eficiente.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 md:p-8 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h3 className="text-2xl font-bold mb-4">
                Enquanto isso, seu restaurante ganha relevância
              </h3>
              <p className="text-gray-600 mb-4">
                O algoritmo do iFood percebe que seu restaurante é
                extremamente eficiente e começa a priorizar você nas buscas e
                recomendações.
              </p>
              <p className="text-gray-600">
                E você investiu só{' '}
                <span className="font-bold text-red-600">R$ 49,90 semanais</span>,
                não R$ 2.500 em mais um funcionário para fazer esse trabalho repetitivo.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="bg-red-600 text-white p-4 text-center">
                  <h4 className="font-bold">RESULTADO</h4>
                </div>
                <div className="bg-white p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Mais pedidos no iFood</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Melhor posicionamento na busca</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Maior faturamento mensal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      <span>Economia em folha de pagamento</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;