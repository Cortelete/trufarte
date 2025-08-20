
import React from 'react';
import { Instagram, WhatsApp } from './icons/SocialIcons';

export default function Footer(): React.ReactNode {
  const developerInstagram = "https://www.instagram.com/InteligenciArte.IA";
  const developerWhatsApp = "https://wa.me/5541988710303?text=Quero%20um%20site%20doce%20e%20fofo%20como%20esse%21%20%F0%9F%8D%AD%E2%9C%A8";
  
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span>Desenvolvido por @InteligenciArte.IA ✨</span>
            <a href={developerInstagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <a
            href={developerWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <WhatsApp className="w-5 h-5" />
            <span>Quer um site fofo como esse? Fale conosco! 🍭</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
