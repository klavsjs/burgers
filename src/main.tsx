import React from "react"
import { createRoot } from "react-dom/client"
import { Provider as ReduxProvider } from "react-redux"
import Root from "./Root"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import ProductList from "./features/products/ProductList"
import Cart from "./features/cart/Cart"
import ProductDetails from "./features/products/ProductDetails"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root>
          <Outlet />
        </Root>
      ),
      children: [
        {
          path: "/",
          element: <ProductList />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/menu/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ])

  root.render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
