import { IDeliveryMan } from '@/types/DeliveryMan';
import { PayloadAction,createSlice } from "@reduxjs/toolkit"; 

interface DeliveryManState {
    data: IDeliveryMan[];
    loading: boolean;
    error: string | null;
}

const initialState: DeliveryManState = {
    data: [],
    loading: false,
    error: null,
}

const deliveryManSlice = createSlice({
    name:"deliveryMan",
    initialState,
    reducers: {
        addDeliveryMan: (state, action: PayloadAction<IDeliveryMan>) => {
            state.data.push(action.payload);
        }, 
        updateDeliveryMan: (state, action: PayloadAction<IDeliveryMan>) => {
            const index = state.data.findIndex(deliveryMan => deliveryMan.id === action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;
            }
        },
        deleteDeliveryMan: (state, action: PayloadAction<{id: string}>) => {
            state.data = state.data.filter(deliveryMan => deliveryMan.id !== action.payload.id);
        },
        setDeliveryMen: (state, action: PayloadAction<IDeliveryMan[]>) => {
            state.data = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    }
})

export const { addDeliveryMan, updateDeliveryMan, deleteDeliveryMan, setDeliveryMen, setLoading, setError } = deliveryManSlice.actions;
export default deliveryManSlice.reducer