import { PayloadAction, createSlice } from '@reduxjs/toolkit'; 


interface IOrderState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: IOrderState = {
    data: [],
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name:"orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<any>) => {
            state.data.push(action.payload);
            
        },
        updateOrder: (state, action: PayloadAction<any>) => {
            const index = state.data.findIndex((order:any) => order.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
     /*    addDeliveryMan: (state, action: PayloadAction<any>) => {
            let id = action.payload.id;
            const order = state.data.find((order:any) => order.id === id);
            if (order) {
                order.customer = "tet"
            }
            
        } , */
        deleteOrder: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter((order:any) => order.id !== action.payload.id);
        },
        setOrders: (state, action: PayloadAction<any[]>) => {

            console.log("🚀 ~ setOrders:")

            
            state.data = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    }, 
})

export const { addOrder, updateOrder, deleteOrder, setOrders, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;