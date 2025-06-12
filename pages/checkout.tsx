// pages/checkout.tsx
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, dispatch } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !address) {
      alert('Please fill in all fields.');
      return;
    }

    // Clear cart and redirect to success page
    dispatch({ type: 'CLEAR_CART' });
    router.push('/success');
  };

  if (cart.length === 0) {
    return <p style={{ padding: '20px' }}>🛒 Your cart is empty. Please add items first.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white mt-10 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col text-sm">
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 px-3 py-2 border rounded"
          />
        </label>
        <label className="flex flex-col text-sm">
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 px-3 py-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
