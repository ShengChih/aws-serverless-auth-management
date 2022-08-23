import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import usersReducer from '@/store/users/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

setupListeners(store.dispatch)