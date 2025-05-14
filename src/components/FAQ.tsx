import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="flex-shrink-0 text-red-600" />
        ) : (
          <ChevronDown className="flex-shrink-0 text-red-600" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'O FoodBot funciona com qualquer tipo de restaurante?',
      answer: 'Sim! O FoodBot funciona com qualquer restaurante que utilize o iFood como plataforma de delivery, independente do tamanho ou tipo de culinária.',
    },
    {
      question: 'A instalação é complicada?',
      answer: 'Não, é super simples! A instalação leva menos de 2 minutos e não requer conhecimentos técnicos. Nosso suporte está disponível para ajudar caso necessário.',
    },
    {
      question: 'O iFood permite o uso do FoodBot?',
      answer: 'O FoodBot é uma ferramenta de automação que trabalha em conjunto com o painel do iFood, assim como outras ferramentas utilizadas por restaurantes. Ele apenas automatiza uma ação que você já realiza manualmente.',
    },
    {
      question: 'Como vou receber os pedidos se o FoodBot marca como pronto automaticamente?',
      answer: 'O FoodBot apenas marca o pedido como "Pronto" no sistema do iFood para melhorar seu ranking no algoritmo. Você continua recebendo normalmente as notificações de novos pedidos e pode gerenciar sua cozinha da maneira habitual.',
    },
    {
      question: 'Preciso fornecer minhas credenciais do iFood?',
      answer: 'Sim, para que o FoodBot funcione, é necessário fornecer acesso seguro ao seu painel do iFood. Todos os dados são criptografados e tratados com o mais alto padrão de segurança.',
    },
    {
      question: 'Posso cancelar quando quiser?',
      answer: 'Sim! Não há contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Perguntas Frequentes
        </h2>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Ainda tem dúvidas? Entre em contato com nossa equipe de suporte.
          </p>
          <a
            href="#"
            className="inline-block bg-red-600 text-white py-3 px-8 rounded-md font-bold hover:bg-red-700 transition-colors"
          >
            FALAR COM SUPORTE
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;