import { createContext, useContext, useReducer, ReactNode } from "react";

type Variant = {
  size: string;
  color: string;
  price: number;
};

type CartItem = {
  id: string;
  title: string;
  image: string;
  variant: Variant;
  quantity: number;
};

type CartState = CartItem[];

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { id: string; variantKey: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; variantKey: string; quantity: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  cart: [],
  dispatch: () => null,
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const variantKey = `${action.payload.variant.size}-${action.payload.variant.color}`;
      const existingIndex = state.findIndex(
        (item) =>
          item.id === action.payload.id &&
          `${item.variant.size}-${item.variant.color}` === variantKey
      );

      if (existingIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      return [...state, action.payload];
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            `${item.variant.size}-${item.variant.color}` === action.payload.variantKey
          )
      );

    case "UPDATE_QUANTITY":
      return state.map((item) => {
        if (
          item.id === action.payload.id &&
          `${item.variant.size}-${item.variant.color}` === action.payload.variantKey
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
