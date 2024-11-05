import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import type { MenuItem as MenuItemType } from "./menuSlice"

const MenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <Link
      to={`/menu/${item.id}`}
      className="relative grid grid-cols-3 overflow-hidden rounded-lg border bg-white transition hover:shadow-lg"
    >
      <div className="col-span-2 flex flex-1 flex-col justify-between p-4">
        <h3 className="text-md mb-1 font-medium">{item.title}</h3>
        <div className="mt-2 w-fit rounded-full">
          <p className="text-sm font-medium text-blue-700">
            CHF {item.price.toFixed(2)}
          </p>
        </div>
        <div className="absolute bottom-0 right-0 rounded-tl-full bg-blue-700 pb-1 pl-2 pr-1 pt-2">
          <Plus color="white" />
        </div>
      </div>
      <img
        src={item.img}
        alt={item.title}
        className="aspect-square object-cover"
      />
    </Link>
  )
}

export default MenuItem
