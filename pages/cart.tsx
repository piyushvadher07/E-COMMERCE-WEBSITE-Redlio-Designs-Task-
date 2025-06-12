import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const router = useRouter();

  const handleRemove = (id: string, variantKey: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, variantKey } });
  };

  const handleQuantityChange = (id: string, variantKey: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, variantKey, quantity } });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  if (cart.length === 0) return <div className="p-6 text-center">🛒 Your cart is empty.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item, index) => {
          const variantKey = `${item.variant.size}-${item.variant.color}`;
          return (
            <div key={index} className="flex gap-4 items-center border p-4 rounded">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Size: {item.variant.size}, Color: {item.variant.color}
                </p>
                <p className="text-sm text-gray-600">Price: ₹{item.variant.price}</p>
                <div className="mt-2 flex items-center gap-4">
                  <label className="text-sm">Qty:</label>
                  <div className="flex items-center border rounded">
                    <button
                      type="button"
                      className="px-3 py-1 text-lg font-bold"
                      onClick={() =>
                        handleQuantityChange(item.id, variantKey, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      type="button"
                      className="px-3 py-1 text-lg font-bold"
                      onClick={() =>
                        handleQuantityChange(item.id, variantKey, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id, variantKey)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-right font-bold text-lg">
        Total: ₹{totalPrice}
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={() => router.push('/checkout')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
