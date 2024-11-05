import { useAppSelector } from "../../app/hooks"
import { menuSlice } from "./menuSlice"
import MenuItem from "./MenuItem"

const Menu = () => {
  const menu = useAppSelector(menuSlice.selectors.selectMenuItems)
  const status = useAppSelector(menuSlice.selectors.selectMenuStatus)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error loading menu</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {menu.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Menu
