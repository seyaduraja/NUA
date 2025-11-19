import { configureStore } from '@reduxjs/toolkit'
import { fakestoreApi } from '../api/fakestoreApi'


export const store = configureStore({
  reducer: {
    [fakestoreApi.reducerPath]: fakestoreApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(fakestoreApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

