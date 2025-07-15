import { configureStore } from '@reduxjs/toolkit'
import  UserReducer  from './userSclice.js'
import ProductReducer from "./ProductSclice.js"

export const store = configureStore({
  reducer: {
        user : UserReducer,
        product:ProductReducer
  }
})