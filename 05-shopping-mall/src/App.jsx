import { NavLink, Link, Outlet, useLoaderData } from "react-router-dom";
import { ContextProvider } from "./Context";
import logo from "./assets/logo.png";
// todo: 스크롤 문제 해결
// 에러 핸들링

function Header() {
  return (
    <header className="flex box-border px-8 xl:px-30 items-center justify-between gap-4">
      <Link to="/">
        <img src={logo} alt="logo" className="w-30" />
      </Link>
      <form
        action="/search"
        className="flex grow gap-4 items-center border-1 border-purple-500 rounded-md px-3 py-2"
      >
        <input type="text" name="query" className="grow" />
        <button className="cursor-pointer">
          <i className="fa-solid fa-magnifying-glass text-lg text-purple-500"></i>
        </button>
      </form>
      <Link to="/cart">
        <i className="fa-solid fa-basket-shopping text-lg"></i>
      </Link>
    </header>
  );
}

function Nav() {
  return (
    <nav className="border-y-2 border-y-gray-100">
      <ul className="flex justify-center items-stretch gap-7 h-full">
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

export default function App() {
  const productsData = useLoaderData();

  return (
    <ContextProvider>
      <div className="grid grid-rows-[100px_70px_1fr_50px] min-h-screen w-full">
        <Header />
        <Nav />
        <Outlet context={productsData} />
        <Footer />
      </div>
    </ContextProvider>
  );
}
