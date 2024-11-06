import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { productsSlice } from "../products/productsSlice"
import { cartSlice } from "./cartSlice"
import { Link } from "react-router-dom"
import PaymentDialog from "./PaymentDialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { EllipsisVertical } from "lucide-react"

const Cart = () => {
  const dispatch = useAppDispatch()
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
          <div
            key={item.id}
            className="flex items-center justify-between border-b p-4 last:border-b-0"
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
            <div className="flex items-center gap-2">
              <p className="text-nowrap text-sm font-medium">
                CHF {item.total.toFixed(2)}
              </p>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="rounded-full p-2 hover:bg-gray-100">
                    <EllipsisVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="min-w-[180px] rounded-lg bg-white p-1 shadow-lg">
                    <DropdownMenu.Item asChild>
                      <Link
                        to={`/menu/${item.id}`}
                        className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-gray-100"
                      >
                        View details
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-gray-100"
                      onClick={() =>
                        dispatch(
                          cartSlice.actions.incrementItemQuantity({
                            id: item.id,
                          }),
                        )
                      }
                    >
                      Add one more
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-gray-100"
                      onClick={() =>
                        dispatch(
                          cartSlice.actions.decrementItemQuantity({
                            id: item.id,
                          }),
                        )
                      }
                    >
                      Remove one
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-red-600 outline-none hover:bg-red-50"
                      onClick={() =>
                        dispatch(cartSlice.actions.removeItem(item.id))
                      }
                    >
                      Remove from cart
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-bold text-sky-700">
            CHF {total.toFixed(2)}
          </p>
        </div>
        <PaymentDialog totalToPay={total} />
      </div>

      <div className="px-4">
        <button
          onClick={() => dispatch(cartSlice.actions.removeAllItems())}
          className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          Clear cart
        </button>
      </div>
    </div>
  )
}

export default Cart
