import { PayloadAction,createSlice } from "@reduxjs/toolkit";


interface SupplementState {
    data: any;
    loading: boolean;
    error: string | null;
}
const initialState: SupplementState = {
    data: [],
    loading: false,
    error: null
}
const supplementSlice = createSlice({
    name: 'supplements',
    initialState,
    reducers: {
        addSupplement: (state, action: PayloadAction<any>) => {
            state.data.push(action.payload);
        },
        updateSupplement: (state, action: PayloadAction<any>) => {
            const index = state.data.findIndex((supplement:any) => supplement.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        deleteSupplement: (state, action: PayloadAction<{ id: string }>) => {
            state.data = state.data.filter((supplement:any) => supplement.id !== action.payload.id);
        },
        setSupplements: (state, action: PayloadAction<any[]>) => {
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


export const { addSupplement, updateSupplement, deleteSupplement, setSupplements, setLoading, setError } = supplementSlice.actions;
export default supplementSlice.reducer;