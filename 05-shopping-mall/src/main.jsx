import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Products from "./Products.jsx";
import Product from "./Product.jsx";
import Home from "./Home.jsx";
import Cart from "./Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        Component: Products,
        path: ":category",
        loader: async ({ params }) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${params.category}`
          );
          const data = await response.json();
          return data;
        },
      },
      {
        path: "search",
        Component: Products,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get("query");
          const response = await fetch("https://fakestoreapi.com/products"); // API에 검색이 없어서 어쩔 수 없이...
          const data = await response.json();

          return data.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
        },
      },
      {
        path: ":category/products/:productId",
        Component: Product,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/${params.productId}`
          );
          const data = await response.json();
          return data;
        },
      },
      {
        path: "/cart",
        Component: Cart,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
