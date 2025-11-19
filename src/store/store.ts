import { configureStore } from '@reduxjs/toolkit'
import { fakestoreApi } from '../api/fakestoreApi'
import cartReducer from '../store/CartSlice'


export const store = configureStore({
  reducer: {
    [fakestoreApi.reducerPath]: fakestoreApi.reducer,
    cart: cartReducer
  },
  middleware: (getDefault) => getDefault().concat(fakestoreApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

