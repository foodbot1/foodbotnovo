import React from 'react';
import { Star, ArrowUp, Clock, TrendingUp, Users } from 'lucide-react';

const ResultsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Restaurante Sabor Mineiro",
      location: "Belo Horizonte, MG",
      text: "Desde que implementamos o FoodBot, nossa média diária de pedidos triplicou. O sistema é perfeito e nunca falha!",
      rating: 5
    },
    {
      name: "Quentinhas da Vila",
      location: "Rio de Janeiro, RJ",
      text: "Melhor investimento que já fiz! Aumentamos de 50 para 180 pedidos por dia em apenas 3 semanas.",
      rating: 5
    },
    {
      name: "Marmitex Express",
      location: "São Paulo, SP",
      text: "O FoodBot revolucionou nosso delivery. Agora somos destaque no iFood da região.",
      rating: 5
    },
    {
      name: "Alaminuta do Sul",
      location: "Porto Alegre, RS",
      text: "Incrível como o FoodBot aumentou nossa visibilidade. Nossos pedidos duplicaram em 2 semanas!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <span className="text-4xl font-bold italic">FoodBot</span>
            <div className="ml-2 bg-green-600 text-white text-sm px-3 py-1 rounded">
              Pedido pronto
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          MAIS DE 600 RESTAURANTES JÁ AUMENTARAM SUAS VENDAS
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-800 transform transition-transform hover:scale-105 duration-200">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <ArrowUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Até 300% mais pedidos
            </h3>
            <p className="text-gray-600">
              Aumento significativo no volume de pedidos com o FoodBot.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-800 transform transition-transform hover:scale-105 duration-200">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Melhor posicionamento
            </h3>
            <p className="text-gray-600">
              Destaque garantido no algoritmo do iFood.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-800 transform transition-transform hover:scale-105 duration-200">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              +600 restaurantes
            </h3>
            <p className="text-gray-600">
              Crescendo com o FoodBot em todo Brasil.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white text-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-lg mb-4 italic">{testimonial.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Pedido pronto
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">
                Invista no sucesso do seu restaurante
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-red-600 mr-2">
                  R$ 49,90
                </span>
                <span className="text-xl">por mês</span>
              </div>
              <p className="text-gray-600 mb-6">
                O preço de 1 delivery de pizza, em vez de um funcionário inteiro na folha.
              </p>
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-red-600 mr-2" />
                <span className="text-sm text-gray-500">
                  Instalação em menos de 2 minutos
                </span>
              </div>
              <a
                href="#"
                className="inline-block bg-red-600 text-white py-3 px-8 rounded-md font-bold hover:bg-red-700 transition-colors transform hover:scale-105 duration-200"
              >
                COMEÇAR AGORA
              </a>
            </div>
            <div className="md:w-1/3">
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold italic">FoodBot</span>
                <div className="ml-2 bg-green-600 text-white text-sm px-3 py-1 rounded">
                  Pedido pronto
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;