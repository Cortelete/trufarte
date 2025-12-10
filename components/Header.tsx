
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

export default function Header(): React.ReactNode {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm shadow-md transition-colors duration-500">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src="/logo.png" alt="Mayatrufados Logo" className="h-12 w-12 object-contain" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Início</Link>
                  <button 
                    onClick={() => setMenuModalOpen(true)}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
                  >
                    Cardápio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Modal isOpen={isMenuModalOpen} onClose={() => setMenuModalOpen(false)} title="Em Construção 🚧">
        <div className="text-center text-text-light space-y-4">
            <p className="text-lg font-medium">Nosso cardápio está sendo preparado com muito carinho!</p>
            <p className="text-sm">Em breve você poderá ver todas as nossas delícias por aqui. 🍫✨</p>
            <button
            onClick={() => setMenuModalOpen(false)}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full hover:opacity-90 transition-opacity font-medium"
            >
            Entendi, vou aguardar!
            </button>
        </div>
      </Modal>
    </>
  );
}
