
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flavors } from '../services/flavors';
import OrderModal from '../components/OrderModal';

export default function FlavorDetailPage(): React.ReactNode {
  const { flavorId } = useParams<{ flavorId: string }>();
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const flavor = flavors.find(f => f.id === flavorId);

  if (!flavor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Sabor não encontrado!</h2>
        <Link to="/cardapio" className="mt-4 inline-block text-primary dark:text-accent hover:underline">
          Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64 md:h-full" src={flavor.image} alt={flavor.name} />
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-accent">{flavor.name}</h1>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-text-light dark:text-secondary-light">
              R$ {flavor.price.toFixed(2).replace('.', ',')}
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-base">{flavor.description}</p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
               <button
                  onClick={() => setOrderModalOpen(true)}
                  className="w-full sm:w-auto relative overflow-hidden flex-grow justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 transition-transform duration-300 group"
                >
                  <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
                  Adicionar ao Carrinho 💖
                </button>
               <Link 
                  to="/cardapio" 
                  className="w-full sm:w-auto flex-grow text-center py-3 px-6 rounded-full font-medium bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Ver outros sabores
                </Link>
            </div>
          </div>
        </div>
      </div>
      {isOrderModalOpen && <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} flavor={flavor} />}
    </>
  );
}
