import "./cart.css";

export default function CartItem({
  item,
  quantity,
  onAddBtnClick,
  onRemoveBtnClick,
}) {
  return (
    <div className="cart-item">
      <div className="img-container">
        <img src={item.imgUrl} />
      </div>
      <div>{item.title}</div>
      <div className="button-container">
        <button className="cart-btn" onClick={() => onRemoveBtnClick(item.id)}>
          -
        </button>
        <div>{quantity}</div>
        <button className="cart-btn" onClick={() => onAddBtnClick(item.id)}>
          +
        </button>
      </div>
    </div>
  );
}
