import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const handleStartClick = async () => {
    if (user) {
      navigate('/payment');
    } else {
      await signIn();
    }
  };

  return (
    <section className="pt-24 pb-16 bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              FOODBOT + iFOOD = <br />
              <span className="text-yellow-300">ALTA DEMANDA</span>
            </h1>
            <p className="text-xl mb-8">
              Aumente sua visibilidade no iFood e receba mais pedidos automaticamente. 
              Enquanto seus concorrentes demoram, o FoodBot marca "Pedido Pronto" 
              <span className="font-bold"> em menos de 1 segundo.</span>
            </p>
            <div className="flex flex-col sm:flex-row">
              <button
                onClick={handleStartClick}
                className="bg-white text-red-600 px-6 py-3 rounded-md font-bold text-lg mb-4 sm:mb-0 sm:mr-4 hover:bg-red-50 transition-colors transform hover:scale-105 duration-200 flex items-center justify-center"
              >
                COMEÇAR AGORA
                <ArrowRight size={20} className="ml-2" />
              </button>
              <a
                href="#how-it-works"
                className="border-2 border-white px-6 py-3 rounded-md font-bold text-lg hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center"
              >
                COMO FUNCIONA
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md">
              <div className="text-black">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-600">
                    Pedido #4872
                  </h3>
                  <span className="text-sm bg-red-600 text-white rounded-full px-3 py-1">
                    Novo
                  </span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">1x</span>
                    <span>X-Burger Especial</span>
                    <span className="font-medium">R$ 29,90</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">2x</span>
                    <span>Batata Frita Grande</span>
                    <span className="font-medium">R$ 15,90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">R$ 45,80</span>
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <button className="w-full bg-green-600 text-white py-3 rounded-md font-bold relative overflow-hidden group">
                    <span className="relative z-10">PEDIDO PRONTO</span>
                    <span className="absolute inset-0 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  FoodBot marca como pronto automaticamente
                  <br />
                  <span className="text-green-600 font-medium">
                    Em menos de 1 segundo!
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-yellow-300 text-black p-3 rounded-lg transform rotate-6 shadow-lg">
              <p className="font-bold text-sm">
                Enquanto outros demoram...
                <br />
                Você já está pronto! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;