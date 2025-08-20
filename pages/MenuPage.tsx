
import React from 'react';
import { flavors } from '../services/flavors';
import FlavorCard from '../components/FlavorCard';

export default function MenuPage(): React.ReactNode {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl sm:text-5xl font-display text-center mb-12 text-primary dark:text-accent">
        Nosso Cardápio
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {flavors.map(flavor => (
          <FlavorCard key={flavor.id} flavor={flavor} />
        ))}
      </div>
    </div>
  );
}
