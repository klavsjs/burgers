import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { productsSlice } from "./productsSlice"
import { cartSlice } from "../cart/cartSlice"

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const menu = useAppSelector(productsSlice.selectors.selectProducts)
  const item = menu.find(item => item.id === id)

  if (!item) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    if (id) {
      dispatch(cartSlice.actions.addItem({ id, quantity: 1 }))
    }
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
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm"
                    >
                      {topping}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-auto space-y-4">
              <p className="text-2xl font-bold text-blue-700">
                CHF {item.price.toFixed(2)}
              </p>
              <button
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
