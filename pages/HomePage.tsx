
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutModal from '../components/AboutModal';
import Modal from '../components/Modal';
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
    className: `group relative w-full flex items-center justify-center px-6 py-4 rounded-full text-sm sm:text-base font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
      disabled 
        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        : 'bg-white/80 dark:bg-gray-800/80 text-text-light dark:text-white border border-white/50 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700'
    }`,
    onClick: disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick,
  };

  const content = (
    <>
      {/* Shimmer Effect Background */}
      <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-primary-light/20 dark:via-white/10 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
      
      {/* Icon Positioned Absolute Left */}
      <span className="absolute left-4 sm:left-6 flex items-center justify-center text-primary dark:text-accent transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      
      {/* Centered Text */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
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
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const images = ['/logo.png', '/moeda.png', '/profile.png'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation(prev => prev + 180); // Flips every 2 seconds
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleInteraction = () => {
    // Adds 3 full rotations for a dynamic spinning effect on click
    setRotation(prev => prev + 360 * 3);
  };

  const currentSpin = Math.floor(rotation / 180);
  let frontImage: string, backImage: string;

  // This logic determines which image should be on which face of the coin
  // to create a seamless 3-image cycle (A -> B -> C -> A)
  if (currentSpin % 2 === 0) { // When the front face is visible
    frontImage = images[currentSpin % 3];
    backImage = images[(currentSpin + 1) % 3];
  } else { // When the back face is visible
    backImage = images[currentSpin % 3];
    frontImage = images[(currentSpin + 1) % 3];
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4">
      <div className="w-full max-w-md bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border border-white/40 dark:border-gray-700/40 flex flex-col items-center transition-all duration-300 relative overflow-hidden">
        
        {/* Profile Section */}
        <div className="mb-6 flex flex-col items-center z-10">
          <div 
            className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer group"
            style={{ perspective: '1200px' }}
            onClick={handleInteraction}
            aria-label="Clique para virar"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleInteraction() }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-1000 ease-out"
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: `rotateY(${rotation}deg)` 
              }}
            >
              {/* Front Face */}
              <div className="absolute w-full h-full flex items-center justify-center bg-transparent" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                <img
                  src={frontImage}
                  alt="Face da moeda"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              
              {/* Back Face */}
              <div 
                className="absolute w-full h-full flex items-center justify-center bg-transparent" 
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <img
                  src={backImage}
                  alt="Face da moeda"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Section */}
        <div className="text-center mb-8 space-y-2 z-10">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary-dark dark:text-accent drop-shadow-sm">
                Mayatrufados
            </h1>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 italic font-medium max-w-xs mx-auto leading-relaxed">
                “Cada bombom é um pedacinho de amor em forma de doce 💖✨”
            </p>
        </div>

        {/* Buttons Section */}
        <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-4 z-10">
          <ShimmerButton href="https://www.instagram.com/mayatrufados/" icon={<Instagram className="w-5 h-5 sm:w-6 sm:h-6" />}>
            INSTAGRAM
          </ShimmerButton>
          <ShimmerButton onClick={() => setMenuModalOpen(true)} icon={<Menu className="w-5 h-5 sm:w-6 sm:h-6" />}>
            NOSSO CARDÁPIO
          </ShimmerButton>
          <ShimmerButton to="/encomendas" icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6" />}>
            FAZER ENCOMENDA
          </ShimmerButton>
          <ShimmerButton onClick={() => setAboutModalOpen(true)} icon={<Info className="w-5 h-5 sm:w-6 sm:h-6" />}>
            SOBRE MIM
          </ShimmerButton>
        </div>
      </div>
      
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      
      <Modal isOpen={isMenuModalOpen} onClose={() => setMenuModalOpen(false)} title="Em Construção 🚧">
        <div className="text-center text-text-light dark:text-text-dark space-y-4">
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
    </div>
  );
}