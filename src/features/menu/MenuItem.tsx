import type { MenuItem as MenuItemType } from "./menuSlice"

const MenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow">
      <h3 className="text-lg font-medium">{item.title}</h3>
      <img
        src={item.img}
        alt={item.title}
        className="aspect-square w-full rounded-lg object-cover"
      />
      <div className="mt-2 w-fit self-end rounded-full bg-amber-900 px-3 py-2">
        <p className="font-medium text-gray-100">CHF {item.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default MenuItem
