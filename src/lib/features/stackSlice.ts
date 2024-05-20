import { IStack } from './../../types/Stack';
import type { RootState } from '../store'
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
            state.data = state.data.map(stack => stack.id === action.payload.id ? action.payload : stack)
        }
    }
})

export const { setStacks, destroy, deleteStack, updateStack } = stackSlice.actions
export default stackSlice.reducer