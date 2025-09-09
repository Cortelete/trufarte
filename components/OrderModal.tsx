
import React, { useState } from 'react';
import Modal from './Modal';
import { Flavor, PaymentMethod } from '../types';
import { useCart } from '../context/CartContext';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  flavor: Flavor;
}

export default function OrderModal({ isOpen, onClose, flavor }: OrderModalProps): React.ReactNode {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.PIX);
  const { addItem, setOrderDetails } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim() === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    addItem({ ...flavor, quantity });
    setOrderDetails({ customerName, paymentMethod });
    onClose();
    setQuantity(1); // Reset for next time
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Adicionar ${flavor.name}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-center">
            <img src={flavor.image} alt={flavor.name} className="w-24 h-24 rounded-full object-cover" />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-text-light dark:text-gray-300">Quantidade</label>
          <div className="mt-1 flex items-center justify-center">
            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 bg-primary-light dark:bg-secondary-dark rounded-l-md">-</button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              readOnly
              className="w-16 text-center border-y border-primary-light dark:border-secondary-dark bg-transparent"
            />
            <button type="button" onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 bg-primary-light dark:bg-secondary-dark rounded-r-md">+</button>
          </div>
        </div>

        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-text-light dark:text-gray-300">Seu Nome</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-text-light dark:text-gray-300">Forma de Pagamento</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            {Object.values(PaymentMethod).map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full relative overflow-hidden flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 transition-transform duration-300"
        >
          Confirmar Pedido 💖
        </button>
      </form>
    </Modal>
  );
}