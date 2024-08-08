import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface Iuser {
    id?:string,
    email?:string
}

// Define the initial state using that type
const initialState: Iuser = {
  email:undefined,
  id:undefined,
}

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    setUser: (state,action:PayloadAction<any>) => {
      state.email = action.payload.email 
      state.id = action.payload.id
    },
    destroy: state => {
      state = initialState
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    
  }
})

export const { setUser, destroy } = userSlice.actions
 
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer