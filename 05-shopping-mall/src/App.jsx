import {
  NavLink,
  Link,
  Outlet,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { createContext, useContext } from "react";
import logo from "./assets/logo.png";

const ProductsContext = createContext();

function Header() {
  return (
    <header className="flex box-border px-8 xl:px-30 items-center justify-between gap-4">
      <Link to="/">
        <img src={logo} alt="logo" className="w-30" />
      </Link>
      <div className="flex grow gap-4 items-center border-1 border-purple-500 rounded-md px-3 py-2">
        <input type="text" className="grow" />
        <i className="fa-solid fa-magnifying-glass text-lg text-purple-500"></i>
      </div>
      <i className="fa-solid fa-basket-shopping text-lg"></i>
    </header>
  );
}

function Nav() {
  return (
    <nav className="border-y-2 border-y-gray-100">
      <ul className="flex flex-column justify-center items-stretch gap-7 h-full">
        <li>
          <NavLink
            to="/men%27s%20clothing"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 h-full block border-b-2 border-b-purple-500 flex items-center"
                : "h-full flex items-center text-gray-700"
            }
          >
            men's clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/women%27s%20clothing"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 h-full block border-b-2 border-b-purple-500 flex items-center"
                : "h-full flex items-center text-gray-700"
            }
          >
            women's clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelery"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 h-full block border-b-2 border-b-purple-500 flex items-center"
                : "h-full flex items-center text-gray-700"
            }
          >
            jewelery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            className={({ isActive }) =>
              isActive
                ? "text-purple-500 h-full block border-b-2 border-b-purple-500 flex items-center"
                : "h-full flex items-center text-gray-700"
            }
          >
            electronics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">@Footer</div>
    </footer>
  );
}

// 제품 목록 페이지
export function Products() {
  const { category } = useParams();
  let products = useContext(ProductsContext);
  if (category) {
    products = products.filter((product) => product.category === category);
  }
  return (
    <main className="grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] xl:grid-cols-5 gap-5 px-8 xl:px-30 py-4">
      {products.map((product) => (
        <Link
          to={"/" + product.category + "/products/" + product.id}
          key={product.id}
        >
          <div className="flex flex-col gap-2">
            <div className="h-50 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain size-full"
              />
            </div>
            <div>{product.title}</div>
            <div className="font-bold">{product.price}$</div>
          </div>
        </Link>
      ))}
    </main>
  );
}

// 제품 상세 페이지
export function Product() {
  const product = useLoaderData();
  return (
    <div className="grid grid-cols-2 gap-4 px-10 xl:px-80 items-center">
      <div className="h-70 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain size-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{product.title}</div>
        <div>{product.description}</div>
        <div className="font-bold">{product.price}$</div>
        <button className="font-bold text-white bg-green-500 py-3 rounded-md cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// async function addToCart() {
//   const response = await fetch("https://fakestoreapi.com/carts/user/1");
//   const cart = await response.json();
//   console.log(cart);
// }

export default function App() {
  const productsData = useLoaderData();

  return (
    <ProductsContext.Provider value={productsData}>
      <div className="grid grid-rows-[100px_70px_1fr_50px] min-h-screen w-">
        <Header />
        <Nav />
        <Outlet context={productsData} />
        <Footer />
      </div>
    </ProductsContext.Provider>
  );
}
