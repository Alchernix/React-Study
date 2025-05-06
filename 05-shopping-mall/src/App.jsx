import { createContext } from "react";
import { useState, useContext } from "react";
import { itemdata, category } from "./data";
import { BasketProvider, useBasket, useBasketDispatch } from "./Context.jsx";
import "./App.css";

const PageContextHandler = createContext(null);

function Header() {
  const setPage = useContext(PageContextHandler);
  const basket = useBasket();

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
      >
        {basket.length > 0 && (
          <div className="notification">{basket.length}</div>
        )}
      </i>
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
  const totalPrice = basket.reduce((acc, item) => {
    const itemDetail = itemdata.find((d) => d.id === item.itemId);
    return acc + itemDetail.price * item.cnt;
  }, 0);
  const content =
    basket.length > 0 ? (
      <>
        {basket.map((item) => (
          <BasketItem key={item.id} item={item} />
        ))}

        <div className="price-container">
          <div>총 금액</div>
          <div className="price">{totalPrice}원</div>
        </div>

        <button className="order-btn">주문하기</button>
      </>
    ) : (
      <div className="no-item-text">
        <div>장바구니에 상품이 없습니다.</div>
      </div>
    );
  return <div className="basket">{content}</div>;
}

function BasketItem({ item }) {
  const dispatch = useBasketDispatch();
  const itemDetail = itemdata.find((d) => d.id === item.itemId);
  const totalPrice = itemDetail.price * item.cnt;

  return (
    <div className="basket-item">
      <div className="img-container">
        <img src={itemDetail.imgUrl} alt={itemDetail.name} />
      </div>
      <div className="item-name">{itemDetail.name}</div>
      <div className="btn-container">
        <button
          onClick={() => {
            if (item.cnt - 1 > 0) {
              dispatch({
                type: "change_cnt",
                itemId: item.itemId,
                cnt: item.cnt - 1,
              });
            } else {
              dispatch({
                type: "remove_item",
                itemId: item.itemId,
              });
            }
          }}
        >
          -
        </button>
        <div>{item.cnt}</div>
        <button
          onClick={() =>
            dispatch({
              type: "change_cnt",
              itemId: item.itemId,
              cnt: item.cnt + 1,
            })
          }
        >
          +
        </button>
      </div>
      <div>{totalPrice}원</div>
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
