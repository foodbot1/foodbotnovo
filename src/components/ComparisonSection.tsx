import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          FUNCIONÁRIO CLT <span className="text-red-600">VS.</span> FOODBOT
          <span className="text-sm ml-2 text-red-600">(para iFood)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Comparativo</th>
                <th className="py-4 px-6 text-center">Funcionário CLT</th>
                <th className="py-4 px-6 text-center">
                  FOODBOT
                  <span className="block text-sm font-normal">
                    (para iFood)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">Custo mensal</td>
                <td className="py-4 px-6 text-center">
                  R$ 2.500 a R$ 3.000
                </td>
                <td className="py-4 px-6 text-center font-bold text-red-600">
                  R$ 49,90 por mês
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">Registro CLT</td>
                <td className="py-4 px-6 text-center flex justify-center">
                  <div className="flex items-center">
                    <CheckCircle className="text-yellow-500 mr-1" size={20} />
                    <span>Sim (INSS, férias, 13º)</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center flex justify-center">
                  <div className="flex items-center">
                    <XCircle className="text-green-500 mr-1" size={20} />
                    <span>Não</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">
                  Atenção exclusiva ao iFood
                </td>
                <td className="py-4 px-6 text-center">
                  Nem sempre
                </td>
                <td className="py-4 px-6 text-center font-bold">
                  100% focado no iFood
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">
                  Trabalha 24h, domingos e feriados?
                </td>
                <td className="py-4 px-6 text-center flex justify-center">
                  <div className="flex items-center">
                    <XCircle className="text-red-500 mr-1" size={20} />
                    <span>Não</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center flex justify-center">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-1" size={20} />
                    <span>Sim</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">Erros?</td>
                <td className="py-4 px-6 text-center">
                  Sim, frequentemente
                </td>
                <td className="py-4 px-6 text-center font-bold">
                  Nunca
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium">Atrasos?</td>
                <td className="py-4 px-6 text-center">
                  Sim
                </td>
                <td className="py-4 px-6 text-center font-bold">
                  Zero atraso
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl font-bold mb-6">
            O FoodBot faz o trabalho de 2 funcionários CLT por apenas R$ 49,90
            por mês.
          </p>
          <a
            href="#trial"
            className="inline-block bg-red-600 text-white py-3 px-8 rounded-md font-bold hover:bg-red-700 transition-colors transform hover:scale-105 duration-200"
          >
            QUERO COMEÇAR AGORA
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;