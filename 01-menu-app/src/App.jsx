import { useState } from "react";
import CartItem from "./cart.jsx";
import "./App.css";
import items from "./data.js";

function MenuItem({ item, onClick }) {
  return (
    <div className="card" onClick={() => onClick(item.id)}>
      <div className="img-container">
        <img src={item.imgUrl} />
      </div>
      <div>
        {item.title}
        {item.isHot && "🌶️"}
        {item.isRecommended && <span>추천</span>}
      </div>
      <div className="price">{item.price.toLocaleString()}원</div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.cnt * items[item.id - 1].price;
  }, 0);
  const isPayActive = cart.length > 0;

  // 메뉴에서 아이템을 클릭하거나 장바구니의 + 버튼 누를 때
  function handleAddToCart(id) {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      // 카트에 아이템이 있을 경우
      setCart(
        cart.map((item) => {
          if (item.id === id) {
            return { id, cnt: item.cnt + 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      // 카트에 아이템이 없을 경우
      setCart([...cart, { id, cnt: 1 }]);
    }
  }

  // 장바구니의 - 버튼 누를 때
  function handleRemoveFromCart(id) {
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem.cnt > 1) {
      // 아이템 개수만 줄이는 경우
      setCart(
        cart.map((item) => {
          if (item.id === id) {
            return { id, cnt: item.cnt - 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      // 아이템을 장바구니에서 빼야 하는 경우
      setCart(cart.filter((item) => item.id !== id));
    }
  }

  return (
    <>
      <h1>메뉴판</h1>
      <div className="container">
        {items.map((item) => (
          <MenuItem
            key={item.id + "menu"}
            item={item}
            onClick={handleAddToCart}
          />
        ))}
      </div>
      <div className="cart-container">
        {cart.map((cartItem) => {
          const item = items.find((item) => item.id === cartItem.id);
          const quantity = cartItem.cnt;
          return (
            <CartItem
              key={item.id + "cart"}
              item={item}
              quantity={quantity}
              onAddBtnClick={handleAddToCart}
              onRemoveBtnClick={handleRemoveFromCart}
            />
          );
        })}
        <div className="total-price">합계 {totalPrice}원</div>
        <button disabled={!isPayActive} className="pay-btn">
          결제
        </button>
      </div>
    </>
  );
}

export default App;
