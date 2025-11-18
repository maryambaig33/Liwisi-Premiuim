export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
