
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Cart, Check, Trash } from './icons/CartIcons';
import { generateWhatsAppLink } from '../utils/whatsapp';

export default function ShoppingCart(): React.ReactNode {
  const { items, total, removeItem, clearCart, orderDetails } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleFinalizeOrder = () => {
    if (items.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
     if (!orderDetails.customerName) {
      alert("Por favor, adicione um item ao carrinho e preencha seu nome para finalizar o pedido.");
      return;
    }
    const whatsappLink = generateWhatsAppLink(items, orderDetails);
    window.open(whatsappLink, '_blank');
    clearCart();
    setIsOpen(false);
  };
  
  if (items.length === 0 && !isOpen) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
        aria-label="Open shopping cart"
      >
        <Cart className="w-8 h-8" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <h3 className="font-bold text-lg text-center mb-4 text-primary dark:text-accent">Seu Pedido 💖</h3>
        {items.length > 0 ? (
          <>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover"/>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {item.quantity} x R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash className="w-4 h-4"/>
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pedido de: {orderDetails.customerName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pagamento: {orderDetails.paymentMethod}</p>
              <button
                onClick={handleFinalizeOrder}
                className="w-full mt-4 bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <Check className="w-5 h-5"/>
                <span>Finalizar Pedido ✨</span>
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">Seu carrinho está vazio.</p>
        )}
      </div>
    </>
  );
}
