
import React from 'react';
import Modal from './Modal';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps): React.ReactNode {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sobre Mim 🌸✨">
      <div className="text-center text-text-light dark:text-text-dark space-y-4">
        <p className="text-lg">Oi, eu sou a Juh!</p>
        <p>Faço bombons caseiros deliciosos, com muito carinho e atenção a cada detalhe.</p>
        <p>Aqui, cada doce é feito para encantar 💖.</p>
      </div>
    </Modal>
  );
}
