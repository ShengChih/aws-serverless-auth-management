import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    listUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { listUsers } = usersSlice.actions

export default usersSlice.reducer