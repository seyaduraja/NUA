import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cart";

const CART_KEY = "cart_v1";

function safeParseCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: safeParseCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty = Math.min(10, existing.qty + item.qty);
      } else {
        state.items.push(item);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    },

    updateQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const { id, qty } = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (qty === 0) {
        state.items = state.items.filter((i) => i.id !== id);
      } else if (it) {
        it.qty = Math.min(10, Math.max(1, qty));
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem(CART_KEY);
    },
  },
});

export const { addItem, updateQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
