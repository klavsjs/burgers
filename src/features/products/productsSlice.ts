import { createAppSlice } from "../../app/createAppSlice"

export interface Product {
  description: string
  id: string
  img: string
  price: number
  rating: number
  title: string
  toppings: string[]
}

export interface ProductsSliceState {
  entities: Product[]
  status: "idle" | "loading" | "failed"
}

const initialState: ProductsSliceState = {
  entities: [],
  status: "idle",
}

export const productsSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: create => ({
    loadProducts: create.asyncThunk(
      async () => {
        const response = await fetch(
          "https://ymagyn-76ef3-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        )
        return response.json()
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.entities = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectProducts: state => state.entities,
    selectProductsStatus: state => state.status,
  },
})
