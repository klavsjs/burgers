import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { menuSlice } from "./menuSlice"
import MenuItem from "./MenuItem"

const Menu = () => {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(menuSlice.selectors.selectMenu)
  const status = useAppSelector(menuSlice.selectors.selectMenuStatus)

  useEffect(() => {
    dispatch(menuSlice.actions.loadMenu())
  }, [dispatch])

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
