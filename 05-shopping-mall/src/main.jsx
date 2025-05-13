import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
import App from "./App.jsx";
import { Products, Product } from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    },
    children: [
      { index: true, Component: Products },
      { Component: Products, path: ":category" },
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
