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

// If you are not using async thunks you can use the standalone `createSlice`.
export const menuSlice = createAppSlice({
  name: "menu",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
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
    selectMenu: state => state.entities,
    selectMenuStatus: state => state.status,
  },
})
