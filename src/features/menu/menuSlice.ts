import { createAppSlice } from "../../app/createAppSlice"

export interface MenuItem {
  description: string
  id: string
  img: string
  price: number
  rating: number
  title: string
  toppings: string[]
}

export interface MenuSliceState {
  entities: MenuItem[]
  status: "idle" | "loading" | "failed"
}

const initialState: MenuSliceState = {
  entities: [],
  status: "idle",
}

export const menuSlice = createAppSlice({
  name: "menu",
  initialState,
  reducers: create => ({
    loadMenu: create.asyncThunk(
      async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products.json`,
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
    selectMenuItems: state => state.entities,
    selectMenuStatus: state => state.status,
  },
})
