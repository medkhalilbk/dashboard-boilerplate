import { IProduct } from '@/types/product';
import { PayloadAction,createSlice } from '@reduxjs/toolkit';


interface ProductState {
    data:IProduct[],
    loading:boolean,
    error:string | null
}

const initialState:ProductState = {
    data:[],
    loading:false,
    error:null
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct:(state,action:PayloadAction<IProduct>) => {
            state.data.push(action.payload)
        },
        updateProduct:(state,action:PayloadAction<IProduct>) => {
            const index = state.data.findIndex(product => product.id === action.payload.id)
            if(index !== -1){
                state.data[index] = action.payload
            }
        },
        deleteProduct:(state,action:PayloadAction<IProduct>) => {
            state.data = state.data.filter(product => product.id !== action.payload.id)
        },
        setProducts:(state,action:PayloadAction<IProduct[]>) => {
            state.data = action.payload
        }
    }
})

export const {addProduct,updateProduct,deleteProduct,setProducts} = productSlice.actions

export default productSlice.reducer