import { configureStore } from '@reduxjs/toolkit'
import  UserReducer  from './userSclice.js'

export const store = configureStore({
  reducer: {
        user : UserReducer
  }
})