import React from 'react';
import { Link } from 'react-router-dom';
import { Flavor } from '../types';

interface FlavorCardProps {
  flavor: Flavor;
}

const FlavorCard: React.FC<FlavorCardProps> = ({ flavor }) => {
  return (
    <Link
      to={`/cardapio/${flavor.id}`}
      className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      <img src={flavor.image} alt={flavor.name} className="w-full h-56 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
      
      <div className="absolute bottom-0 left-0 p-3 sm:p-6 text-white w-full z-20">
        <h3 className="text-lg sm:text-2xl font-display font-bold">{flavor.name}</h3>
        <p className="text-sm sm:text-lg font-semibold text-accent mt-1">R$ {flavor.price.toFixed(2).replace('.', ',')}</p>
        <div 
          className="mt-2 sm:mt-4 inline-block bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full font-semibold text-xs sm:text-base transition-all duration-300 transform group-hover:scale-105"
        >
          Ver mais 🍫
        </div>
      </div>
    </Link>
  );
};

export default FlavorCard;