import { createSlice } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  quantity: number
}

export interface CartSliceState {
  entities: Record<string, number>
  status: "idle" | "loading" | "failed"
}

const initialState: CartSliceState = {
  entities: {},
  status: "idle",
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.entities[action.payload.id] =
        (state.entities[action.payload.id] || 0) + action.payload.quantity
    },
  },
  selectors: {
    selectCartItems: state => state.entities,
    selectCartTotalQuantity: state =>
      Object.values(state.entities).reduce(
        (sum, quantity) => sum + quantity,
        0,
      ),
  },
})
