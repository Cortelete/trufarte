
import { CartItem, OrderDetails } from '../types';

const phoneNumber = "+5587996346709"; // Juh's WhatsApp number

export function generateWhatsAppLink(items: CartItem[], orderDetails: OrderDetails): string {
  const itemsText = items.map(item =>
    `- ${item.name} x${item.quantity} (R$ ${(item.quantity * item.price).toFixed(2).replace('.', ',')})`
  ).join('\n');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = `
Olá, Juh! Gostaria de fazer um pedido. 💖

*Pedido de:* ${orderDetails.customerName}

*Sabores:*
${itemsText}

*Forma de Pagamento:* ${orderDetails.paymentMethod}

*Total:* R$ ${total.toFixed(2).replace('.', ',')}
  `;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
}

interface CustomOrderData {
    name: string;
    whatsapp: string;
    eventDate?: string;
    eventType?: string;
    description: string;
}

export function generateCustomOrderWhatsAppLink(data: CustomOrderData): string {
    const message = `
Olá, Juh! Gostaria de fazer uma encomenda personalizada. 💖

*Nome:* ${data.name}
*WhatsApp:* ${data.whatsapp}
${data.eventDate ? `*Data do Evento/Entrega:* ${data.eventDate}` : ''}
${data.eventType ? `*Tipo de Evento:* ${data.eventType}` : ''}

*Descrição da Encomenda:*
${data.description}
    `;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim().replace(/\n\n/g, '\n'))}`;
}
