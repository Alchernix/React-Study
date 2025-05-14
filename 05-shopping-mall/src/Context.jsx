import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

function ContextProvider({ children }) {
  const [cart, dispatch] = useImmerReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

function cartReducer(cart, action) {
  switch (action.type) {
    case "add": {
      if (!cart.find((product) => product.id === action.product.id)) {
        cart.push({
          ...action.product,
          quantity: 1,
        });
      }
      break;
    }
    case "changeCnt": {
      const cartItem = cart.find((product) => product.id === action.id);
      cartItem.quantity = action.quantity;
    }
  }
}

function useCart() {
  return useContext(CartContext);
}

function useCartDispatch() {
  return useContext(CartDispatchContext);
}

export { ContextProvider, useCart, useCartDispatch };
