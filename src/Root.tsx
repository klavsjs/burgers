import { useEffect } from "react"
import type { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { menuSlice } from "./features/menu/menuSlice"
import { cartSlice } from "./features/cart/cartSlice"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

const Root = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const cartTotalQuantity = useAppSelector(
    cartSlice.selectors.selectCartTotalQuantity,
  )
  const location = useLocation()

  useEffect(() => {
    dispatch(menuSlice.actions.loadMenu())
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900">Burger & Burgers</h1>
          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            <ShoppingCart />
            {cartTotalQuantity > 0 && (
              <span className="min-w-6 text-center font-medium">
                {cartTotalQuantity}
              </span>
            )}
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-4 px-4 py-6">
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="inline-block w-fit rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              ← Back to Menu
            </Link>
          )}
          {children}
        </div>
      </main>
      <footer className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} | 🍔 & 🍔🍔
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Root
