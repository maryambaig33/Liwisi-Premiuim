import { Product } from './types';

export const GEMINI_MODEL = 'gemini-2.5-flash';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Cloud Sofa',
    price: 2400,
    salePrice: 1899,
    category: 'Living Room',
    image: 'https://picsum.photos/id/1036/800/800',
    description: 'Experience the sensation of floating with our plush, modular Cloud Sofa. Designed for ultimate relaxation.',
    tags: ['Best Seller', 'Black Friday Deal']
  },
  {
    id: '2',
    name: 'Eames-Style Lounge',
    price: 1200,
    salePrice: 850,
    category: 'Chairs',
    image: 'https://picsum.photos/id/1060/800/800',
    description: 'Mid-century modern aesthetic meets ergonomic excellence. Premium leather finish.',
    tags: ['Classic', 'Limited Stock']
  },
  {
    id: '3',
    name: 'Nordic Oak Dining Table',
    price: 899,
    category: 'Dining',
    image: 'https://picsum.photos/id/1080/800/800',
    description: 'Solid oak construction with a minimalist silhouette. Perfect for family gatherings.',
    tags: ['Sustainable']
  },
  {
    id: '4',
    name: 'Industrial Floor Lamp',
    price: 250,
    salePrice: 199,
    category: 'Lighting',
    image: 'https://picsum.photos/id/1035/800/800',
    description: 'A statement piece that illuminates your space with a warm, ambient glow.',
    tags: ['Decor']
  },
  {
    id: '5',
    name: 'Velvet Accent Chair',
    price: 450,
    category: 'Chairs',
    image: 'https://picsum.photos/id/1062/800/800',
    description: 'Add a pop of color and texture with this luxurious velvet armchair.',
    tags: ['New Arrival']
  },
  {
    id: '6',
    name: 'Minimalist Coffee Table',
    price: 350,
    salePrice: 275,
    category: 'Living Room',
    image: 'https://picsum.photos/id/1078/800/800',
    description: 'Sleek glass and metal design that maximizes visual space in smaller rooms.',
    tags: ['Black Friday Deal']
  }
];

export const SYSTEM_INSTRUCTION = `
You are "Liwisi AI", a sophisticated interior design assistant for the Liwisi brand.
We sell premium, modern furniture.
Your tone is elegant, helpful, and concise.
You should help customers find products from our catalog, give design advice (e.g., color matching, layout), and explain the benefits of our Black Friday sales.
Do not invent products that are not generally found in a modern furniture store, but you can speak generally about design concepts.
If asked about specific prices, refer to the context provided or suggest checking the product page, but try to be helpful with general ranges if known (assume premium pricing).
Always be polite and encourage the user to envision the furniture in their home.
`;