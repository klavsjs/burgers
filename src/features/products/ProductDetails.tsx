import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { productsSlice } from "./productsSlice"
import { cartSlice } from "../cart/cartSlice"
import { Minus, Plus, Trash2 } from "lucide-react"

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const menu = useAppSelector(productsSlice.selectors.selectProducts)
  const item = menu.find(item => item.id === id)

  const quantity = useAppSelector(state =>
    cartSlice.selectors.selectItemQuantity(state, id ?? ""),
  )

  const handleAddToCart = () => {
    dispatch(cartSlice.actions.addItem({ id, quantity: 1 }))
  }

  const handleRemoveFromCart = () => {
    dispatch(cartSlice.actions.removeItem(id))
  }

  const handleIncrementQuantity = () => {
    dispatch(cartSlice.actions.incrementItemQuantity({ id }))
  }

  const handleDecrementQuantity = () => {
    if (quantity === 1) {
      handleRemoveFromCart()
    } else {
      dispatch(cartSlice.actions.decrementItemQuantity({ id }))
    }
  }

  if (!item) {
    return <div>Product not found</div>
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img
            src={item.img}
            alt={item.title}
            className="aspect-square w-full object-cover"
          />
          <div className="flex flex-col justify-between p-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <p className="text-lg text-gray-600">{item.description}</p>
              <div className="mb-4 flex flex-col gap-2">
                <p className="text-lg font-semibold">Toppings</p>
                <ul className="flex flex-wrap gap-2">
                  {item.toppings.map(topping => (
                    <li
                      key={topping}
                      className="rounded-full bg-sky-100 px-3 py-1 text-sm"
                    >
                      {topping}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-auto space-y-4">
              <p className="text-2xl font-bold text-sky-700">
                CHF {item.price.toFixed(2)}
              </p>
              {quantity > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleDecrementQuantity}
                        className="rounded-full bg-sky-700 p-2 text-white hover:bg-sky-800"
                      >
                        <Minus />
                      </button>
                      <span className="w-6 text-center font-mono text-lg font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrementQuantity}
                        className="rounded-full bg-sky-700 p-2 text-white hover:bg-sky-800"
                      >
                        <Plus />
                      </button>
                    </div>
                    <button
                      onClick={handleRemoveFromCart}
                      className="rounded-lg bg-rose-600 p-2 text-white hover:bg-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-lg bg-sky-700 px-4 py-2 text-white hover:bg-sky-800"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
