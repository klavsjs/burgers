import { Link } from "react-router-dom"
import type { Product } from "./productsSlice"
import { useAppSelector } from "../../app/hooks"
import { cartSlice } from "../cart/cartSlice"

const ProductListItem = ({ item }: { item: Product }) => {
  const quantity = useAppSelector(state =>
    cartSlice.selectors.selectItemQuantity(state, item.id),
  )

  return (
    <Link
      to={`/menu/${item.id}`}
      className="relative grid grid-cols-3 overflow-hidden rounded-lg border bg-white transition hover:shadow-lg"
    >
      <div className="col-span-2 flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-md font-medium">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-500">{item.description}</p>
        <p className="mt-auto text-sm font-semibold text-sky-700">
          CHF {item.price.toFixed(2)}
        </p>
      </div>
      <img
        src={item.img}
        alt={item.title}
        className="h-full w-full object-cover"
      />
      {quantity > 0 && (
        <div className="absolute bottom-0 right-0 h-8 w-8 rounded-tl-full bg-sky-700 text-white">
          <span className="absolute bottom-1 right-2 font-mono text-sm">
            {quantity}
          </span>
        </div>
      )}
    </Link>
  )
}

export default ProductListItem
