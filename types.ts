
export interface Flavor {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export enum PaymentMethod {
  PIX = 'Pix',
  CARD = 'Cartão',
  CASH = 'Dinheiro',
}

export interface OrderDetails {
  customerName: string;
  paymentMethod: PaymentMethod;
}
