import { IMenu } from "@/types/menu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CompanyState {
    data: IMenu[];
    loading: boolean;
    error: string | null;
  }
  const initialState: CompanyState = {
    data: [],
    loading: false,
    error: null,
  };


  const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        addMenu:(state,action:PayloadAction<IMenu>) => {
            state.data.push(action.payload)
        },
        updateMenu:(state,action:PayloadAction<IMenu>) => {
            console.log("state.menu")
            const index = state.data.findIndex(menu => menu.id === action.payload.id)
            if(index !== -1){
                state.data[index] = action.payload
            }
        }, 
        deleteMenu:(state,action:PayloadAction<IMenu>) => {
            state.data = state.data.filter(company => company.id !== action.payload.id)
           
        },
        setMenus:(state,action:PayloadAction<IMenu[]>) => {
            state.data = action.payload
        } ,

    }
  })

  export const {addMenu,updateMenu,deleteMenu,setMenus} = menuSlice.actions

  export default menuSlice.reducer