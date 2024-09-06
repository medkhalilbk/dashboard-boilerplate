import { PayloadAction, createSlice } from '@reduxjs/toolkit'; 


interface IOrderState {
    data: any; 
}

const initialState: IOrderState = {
     data:[]
};

const ordersSlice = createSlice({
    name:"orders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<any[]>) => { 
            console.log(action.payload?.length) 
            console.log(action.payload)
            state.data = Array.from(action.payload);
        },
    }, 
})

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;