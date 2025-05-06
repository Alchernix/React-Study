import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

const BasketContext = createContext(null);
const BasketDispatchContext = createContext(null);

function useBasket() {
  return useContext(BasketContext);
}

function useBasketDispatch() {
  return useContext(BasketDispatchContext);
}

function BasketProvider({ children }) {
  const [basket, dispatch] = useImmerReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={basket}>
      <BasketDispatchContext.Provider value={dispatch}>
        {children}
      </BasketDispatchContext.Provider>
    </BasketContext.Provider>
  );
}

function basketReducer(basket, action) {
  switch (action.type) {
    case "add_item": {
      const basketItem = basket.find((item) => item.itemId === action.itemId);
      if (basketItem) {
        basketItem.cnt += action.cnt;
      } else {
        basket.push({ itemId: action.itemId, cnt: action.cnt });
      }
      break;
    }
    case "remove_item": {
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].itemId === action.itemId) {
          basket.splice(i, 1);
        }
      }
      break;
    }
    case "change_cnt": {
      const basketItem = basket.find((item) => item.itemId === action.itemId);
      basketItem.cnt = action.cnt;
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export { BasketProvider, useBasket, useBasketDispatch };
