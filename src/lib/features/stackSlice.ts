import { IStack } from './../../types/Stack'; 
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Istack {
    data: IStack[]
}

const initialState: Istack = {
    data: []
} as Istack 


export const stackSlice = createSlice({
    name: 'stacks',
    initialState,
    reducers: {
        setStacks: (state,action:PayloadAction<IStack[]>) => {
            state.data = action.payload
        },
        destroy: state => {
            state = initialState
        },
        deleteStack : (state,action:PayloadAction<string>) => {
            state.data = state.data.filter(stack => stack.id !== action.payload)
        },
        updateStack : (state,action:PayloadAction<IStack>) => {
            console.log("test from reducer")
            console.log(action.payload)
            state.data = state.data.map(stack => stack.id === action.payload.id ? action.payload : stack)
        } ,
        addStack: (state,action:PayloadAction<IStack>) => {
            state.data = [...state.data, action.payload]
        }
    }
})

export const { setStacks, destroy, deleteStack, updateStack , addStack } = stackSlice.actions
export default stackSlice.reducer