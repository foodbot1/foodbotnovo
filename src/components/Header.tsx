import React, { useState, useEffect } from 'react';
import { ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleStartClick = async () => {
    if (user) {
      navigate('/payment');
    } else {
      await signIn();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-red-600 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold italic">
            FoodBot
          </span>
          <div className="hidden sm:flex ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Pedido pronto
          </div>
          <div className="hidden sm:block ml-1 text-white">
            <ArrowRight size={16} className="inline-block ml-1" />
          </div>
        </div>

        <div className="flex items-center">
          <a
            href="#pricing"
            className="hidden sm:block text-white mr-6 hover:text-red-100 transition-colors"
          >
            Planos
          </a>
          <a
            href="#how-it-works"
            className="hidden sm:block text-white mr-6 hover:text-red-100 transition-colors"
          >
            Como Funciona
          </a>
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition-colors transform hover:scale-105 duration-200"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={handleStartClick}
              className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition-colors transform hover:scale-105 duration-200 flex items-center"
            >
              <LogIn size={20} className="mr-2" />
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;