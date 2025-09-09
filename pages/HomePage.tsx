import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutModal from '../components/AboutModal';
import { Instagram, Menu, Mail, Info } from '../components/icons/SocialIcons';

const ShimmerButton: React.FC<{
  href?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  disabled?: boolean;
}> = ({ href, to, onClick, children, icon, disabled }) => {
  const commonProps = {
    className: `group relative w-full flex items-center justify-center p-4 my-3 rounded-full text-base sm:text-lg font-semibold overflow-hidden transition-all duration-300 shadow-lg transform hover:scale-105 ${
      disabled 
        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-primary-light to-pink-100 dark:from-primary-dark dark:to-pink-900 text-text-light dark:text-white'
    }`,
    onClick: disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick,
  };

  const content = (
    <>
      <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
      <div className="flex items-center space-x-3">
        {icon}
        <span>{children}</span>
      </div>
    </>
  );

  if (to && !disabled) {
    return <Link to={to} {...commonProps}>{content}</Link>;
  }
  
  if (href && !disabled) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{content}</a>;
  }
  
  return <button {...commonProps}>{content}</button>;
};

export default function HomePage(): React.ReactNode {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
      <div className="mb-4 flex flex-col items-center">
        <div 
          className="relative w-28 h-28 sm:w-32 sm:h-32 cursor-pointer group"
          style={{ perspective: '1200px' }}
          onClick={() => setIsFlipped(!isFlipped)}
          aria-label="Clique para virar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped) }}
        >
          <div 
            className="relative w-full h-full transition-transform duration-1000 ease-out"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front Face: Profile Picture */}
            <div className="absolute w-full h-full rounded-full overflow-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <img
                src="/profile.png"
                alt="Foto de perfil de Juh"
                className="w-full h-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
              />
            </div>
            
            {/* Back Face: Logo */}
            <div 
              className="absolute w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-secondary-light dark:bg-gray-800 border-4 border-white dark:border-gray-700 shadow-xl" 
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <img
                src="/logo.png"
                alt="Trufarte Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain p-2"
              />
            </div>
          </div>
        </div>
      </div>
      <img
          src="/logo.png"
          alt="Trufarte"
          className="w-36 mt-2 object-contain"
      />
      <p className="mt-1 text-lg sm:text-xl text-gray-700 dark:text-gray-400">Juh Trufados</p>
      <p className="mt-4 text-center text-base sm:text-lg text-gray-600 dark:text-gray-300">
        “Cada bombom é um pedacinho de amor em forma de doce 💖✨”
      </p>

      <div className="w-full mt-8">
        <ShimmerButton href="https://www.instagram.com/mayatrufados/" icon={<Instagram />}>Instagram</ShimmerButton>
        <ShimmerButton to="/cardapio" icon={<Menu />}>Cardápio</ShimmerButton>
        <ShimmerButton to="/encomendas" icon={<Mail />}>Encomendas</ShimmerButton>
        <ShimmerButton onClick={() => setAboutModalOpen(true)} icon={<Info />}>Sobre Mim</ShimmerButton>
      </div>
      
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </div>
  );
}