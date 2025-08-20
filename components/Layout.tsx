import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  return <div className="star" style={style}></div>;
};

const StarryBackground: React.FC = () => {
    const [stars, setStars] = React.useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = [];
            const numStars = 100;
            for (let i = 0; i < numStars; i++) {
                const size = Math.random() * 2 + 1;
                const style = {
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 5 + 3}s`,
                };
                newStars.push(<Star key={i} style={style} />);
            }
            setStars(newStars);
        };
        generateStars();
    }, []);

    return <div className="starry-bg">{stars}</div>;
};

const FloatingEmojis: React.FC = () => {
  const [emojis, setEmojis] = React.useState<React.ReactNode[]>([]);
  const emojiSelection = ['🍫', '🍬', '💖', '🧁', '✨'];

  useEffect(() => {
    const generateEmojis = () => {
      const newEmojis = [];
      const numEmojis = 30; // Number of emojis on screen
      for (let i = 0; i < numEmojis; i++) {
        const style: React.CSSProperties = {
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 1.5 + 0.8}rem`, // Varies from 0.8rem to 2.3rem
          opacity: Math.random() * 0.4 + 0.1, // Varies from 0.1 to 0.5
          filter: `blur(${Math.random() * 2.5}px)`, // Some sharp, some blurry
          animation: `twinkle ${Math.random() * 10 + 8}s ease-in-out infinite alternate`,
          animationDelay: `${Math.random() * 8}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
          userSelect: 'none',
          zIndex: -1,
        };
        const emoji = emojiSelection[Math.floor(Math.random() * emojiSelection.length)];
        newEmojis.push(<span key={`emoji-${i}`} style={style} aria-hidden="true">{emoji}</span>);
      }
      setEmojis(newEmojis);
    };
    generateEmojis();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {emojis}
    </div>
  );
};


export default function Layout(): React.ReactNode {
  return (
    <div className="bg-secondary-light dark:bg-gray-900 text-text-light dark:text-text-dark min-h-screen font-sans transition-colors duration-500">
      <StarryBackground />
      <FloatingEmojis />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24 min-h-[calc(100vh-8rem)]">
          <Outlet />
        </main>
        <ShoppingCart />
        <Footer />
      </div>
    </div>
  );
}