import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  name: string
  quantity: number
  categoryId: number
}

export interface CartState {
  [category: string]: Product[]
}

const initialState: CartState = {}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ category: string, product: Product }>) => {
      const { category, product } = action.payload
      if (!state[category]) {
        state[category] = []
      }
      state[category].push(product)
    },
    clearCart: () => initialState
  },
})

export const { addProduct, clearCart } = cartSlice.actions
export default cartSlice.reducer
