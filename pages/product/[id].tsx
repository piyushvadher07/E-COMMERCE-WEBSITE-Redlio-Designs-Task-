import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';


type Variant = {
  size: string;
  color: string;
  price: number;
};

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  variants: Variant[];
};

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
  if (!selectedVariant) return;

  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      id: product.id,
      title: product.title,
      image: product.image,
      variant: selectedVariant,
      quantity: 1,
    },
  });

  toast.success('🛒 Added to cart!');
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 rounded object-cover" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <h3 className="font-semibold mb-2">Select Variant:</h3>
          <div className="space-y-2">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(variant)}
                className={`block w-full text-left p-3 border rounded ${
                  selectedVariant === variant ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                Size: {variant.size}, Color: {variant.color}, Price: ₹{variant.price}
              </button>
            ))}
          </div>
          <button
            disabled={!selectedVariant}
            onClick={handleAddToCart}
            className={`mt-6 px-6 py-2 text-white rounded ${
              selectedVariant ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);
  const product = products.find((p) => p.id === id);

  return {
    props: { product },
  };
};
