import { createContext } from "react";
import { useState, useContext } from "react";
import { itemdata, category } from "./data";
import { BasketProvider, useBasket, useBasketDispatch } from "./Context.jsx";
import "./App.css";

const PageContextHandler = createContext(null);

function Header() {
  const setPage = useContext(PageContextHandler);

  return (
    <header>
      <h1 onClick={() => setPage("메인")}>쇼핑몰</h1>
      <div className="search-container">
        <input type="text" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <i
        className="fa-solid fa-basket-shopping basket-btn"
        onClick={() => setPage("장바구니")}
      ></i>
    </header>
  );
}

function Category({ currentCategory, onChange }) {
  return (
    <nav>
      <ul>
        {category.map((c) => (
          <li
            key={c}
            onClick={() => {
              onChange(c);
            }}
            className={c === currentCategory ? "selected" : ""}
          >
            {c}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MainItem({ item, setCurrentItemId }) {
  const setPage = useContext(PageContextHandler);

  return (
    <div
      className="main-item"
      onClick={() => {
        setCurrentItemId(item.id);
        setPage("상세보기");
      }}
    >
      <div className="img-container">
        <img src={item.imgUrl} alt={item.name} />
      </div>
      <div className="item-name">{item.name}</div>
      <div className="price">{item.price}원</div>
      <div>
        <i className="fa-solid fa-star"></i> {item.rating}
      </div>
    </div>
  );
}

function Detail({ item }) {
  const [itemCnt, setItemCnt] = useState(0);
  const totalPrice = item.price * itemCnt;
  const dispatch = useBasketDispatch();

  return (
    <main className="detail">
      <div className="detail-layout-container">
        <div className="img-container">
          <img src={item.imgUrl} alt={item.name} />
        </div>
        <div className="detail-text">
          <div className="detail-inner1">
            <div className="item-name">{item.name}</div>
            <div className="price">{item.price}원</div>
            <div>
              <i className="fa-solid fa-star"></i> {item.rating}
            </div>
          </div>
          <div className="detail-inner2">
            <div className="btn-container">
              <button
                onClick={() => {
                  if (itemCnt - 1 >= 0) {
                    setItemCnt((c) => c - 1);
                  }
                }}
              >
                -
              </button>
              <div>{itemCnt}</div>
              <button onClick={() => setItemCnt((c) => c + 1)}>+</button>
            </div>
            <div className="price-container">
              <div>총 상품 금액</div>
              <div className="price">{totalPrice}원</div>
            </div>
            <button
              disabled={!(itemCnt > 0)}
              className="put-in-basket-btn"
              onClick={() => {
                setItemCnt(0);
                dispatch({
                  type: "add_item",
                  itemId: item.id,
                  cnt: itemCnt,
                });
              }}
            >
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Basket() {
  const basket = useBasket();
  return basket.map((item) => <BasketItem key={item.id} item={item} />);
}

function BasketItem({ item }) {
  const itemDetail = itemdata.find((d) => d.id === item.itemId);
  const totalPrice = itemDetail.price * item.cnt;

  return (
    <div>
      <div className="img-container">
        <img src={itemDetail.imgUrl} alt={itemDetail.name} />
      </div>
      <div>{itemDetail.name}</div>
      <div>{item.cnt}</div>
      <div>{totalPrice}</div>
    </div>
  );
}

function loadItems(category) {
  let items;
  if (category === "전체") {
    items = itemdata;
  } else {
    items = itemdata.filter((item) => item.category === category);
  }
  return items;
}

export default function App() {
  const [currentCategory, setCurrentCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState("메인"); // 메인, 상세보기, 장바구니 - 나중에 리엑트 라우터로 리펙토링 예정
  const [currentItemId, setCurrentItemId] = useState(null);

  const items = loadItems(currentCategory);
  let content;

  switch (currentPage) {
    case "메인":
      content = (
        <div className="layout-container">
          <Header />
          <Category
            currentCategory={currentCategory}
            onChange={setCurrentCategory}
          />
          <main className="main">
            <div className="item-container">
              {items.map((item) => (
                <MainItem
                  key={item.id}
                  item={item}
                  setCurrentItemId={setCurrentItemId}
                />
              ))}
            </div>
          </main>
        </div>
      );
      break;
    case "상세보기":
      const item = itemdata.find((item) => item.id === currentItemId);

      content = (
        <div className="layout-container-detail">
          <Header />
          <Detail item={item} />
        </div>
      );
      break;
    case "장바구니":
      content = (
        <div className="layout-container-basket">
          <Header />
          <Basket />
        </div>
      );
      break;
  }

  return (
    <PageContextHandler.Provider value={setCurrentPage}>
      <BasketProvider>{content}</BasketProvider>
    </PageContextHandler.Provider>
  );
}
