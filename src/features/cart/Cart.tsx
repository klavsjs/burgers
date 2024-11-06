import { useAppSelector } from "../../app/hooks"
import { productsSlice } from "../products/productsSlice"
import { cartSlice } from "./cartSlice"
import { Link } from "react-router-dom"
import PaymentDialog from "./PaymentDialog"

const Cart = () => {
  const cart = useAppSelector(cartSlice.selectors.selectCartItems)
  const menu = useAppSelector(productsSlice.selectors.selectProducts)

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const menuItem = menu.find(item => item.id === id)
    return {
      ...menuItem,
      quantity: quantity,
      total: menuItem ? menuItem.price * quantity : 0,
    }
  })

  const total = cartItems.reduce((sum, item) => sum + item.total, 0)

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-center">
        <p className="text-lg text-gray-600">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        {cartItems.map(item => (
          <Link
            key={item.id}
            to={`/menu/${item.id}`}
            className="flex items-center justify-between border-b p-4 last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.title}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} × CHF {item.price?.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="font-medium">CHF {item.total.toFixed(2)}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-bold text-blue-700">
            CHF {total.toFixed(2)}
          </p>
        </div>
        <PaymentDialog totalToPay={total} />
      </div>
    </div>
  )
}

export default Cart
