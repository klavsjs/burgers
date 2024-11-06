import { useAppSelector } from "../../app/hooks"
import { productsSlice } from "./productsSlice"
import ProductListItem from "./ProductListItem"

const ProductList = () => {
  const menu = useAppSelector(productsSlice.selectors.selectProducts)
  const status = useAppSelector(productsSlice.selectors.selectProductsStatus)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error loading products</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {menu.map(item => (
        <ProductListItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ProductList
