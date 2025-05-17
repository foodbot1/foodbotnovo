import React from 'react';
import { CheckCircle, XCircle, Zap, Clock } from 'lucide-react';

const ValueSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <span className="text-3xl font-bold italic">FoodBot</span>
          <div className="ml-2 bg-green-600 text-white text-sm px-3 py-1 rounded">
            Pedido pronto
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            No iFood, cada segundo conta para o{' '}
            <span className="text-red-600">sucesso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O algoritmo do iFood prioriza restaurantes que marcam pedidos como prontos rapidamente.
            Não desperdice dinheiro com funcionários só para clicar em botões.
          </p>
        </div>

        <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Por que cada clique em "Pedido Pronto" é tão importante?
          </h3>
          <div className="space-y-4 mb-6">
            <p className="text-lg">
              O iFood analisa constantemente o tempo que cada restaurante leva para marcar pedidos como prontos.
            </p>
            <p className="text-lg font-bold">
              Quanto mais rápido você marca como pronto, mais pedidos o iFood te envia automaticamente.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
            <h4 className="font-bold text-lg mb-2">
              O que o FoodBot faz por você:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock
                  size={20}
                  className="text-red-600 mr-2 mt-1 flex-shrink-0"
                />
                <span>
                  Marca pedidos como prontos em menos de 1 segundo, 24 horas por dia
                </span>
              </li>
              <li className="flex items-start">
                <Zap
                  size={20}
                  className="text-red-600 mr-2 mt-1 flex-shrink-0"
                />
                <span>
                  Mantém seu restaurante sempre bem posicionado no algoritmo
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 bg-red-600 text-white p-6 md:p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Pagar R$ 2.500/mês para alguém só clicar em "Pedido Pronto"?
            </h3>
            <p className="text-3xl font-bold mb-2">
              R$ 49,90{' '}
              <span className="text-xl font-normal">por mês é muito mais inteligente.</span>
            </p>
            <p className="text-lg mb-6">
              Use seu funcionário para tarefas que realmente importam na cozinha!
            </p>
            <a
              href="#"
              className="block w-full bg-white text-red-600 py-3 text-center rounded-md font-bold hover:bg-red-50 transition-colors transform hover:scale-105 duration-200"
            >
              COMEÇAR AGORA
            </a>
          </div>

          <div className="flex-1 border border-gray-200 p-6 md:p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              FOODBOT – AUTOMATIZE O QUE PODE SER AUTOMATIZADO
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle
                  size={24}
                  className="text-green-500 mr-3 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="font-bold">MAIS VISIBILIDADE NO iFOOD</p>
                  <p className="text-gray-600">
                    Cliques automáticos em "Pedido Pronto" 24h por dia, 7 dias por semana
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle
                  size={24}
                  className="text-green-500 mr-3 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="font-bold">ECONOMIA INTELIGENTE</p>
                  <p className="text-gray-600">
                    Por que pagar um salário inteiro para algo que pode ser automatizado?
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle
                  size={24}
                  className="text-green-500 mr-3 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="font-bold">FOCO NO QUE IMPORTA</p>
                  <p className="text-gray-600">
                    Deixe sua equipe focada na qualidade da comida e no atendimento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;