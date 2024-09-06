import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import  stackSlice  from './features/stackSlice';
import clientsSlice from './features/clientsSlice';
import { Reducer } from 'redux'; // Import Reducer from redux
import companySlice from './features/companySlice';
import deliveryManSlice from './features/deliveryManSlice';
import MenuSlice from './features/MenuSlice';
import productSlice from './features/productsSlice'; 
import orderSlice from './features/orderSlice';
import supplementslice from './features/supplementSlice'
export const store = () => {
  return configureStore({
    reducer: {
      user: userSlice, 
      stacks: stackSlice,  
      company:companySlice,
      deliveryMan:deliveryManSlice , 
      clients: clientsSlice,
      menus:MenuSlice,
      products:productSlice,
      orders:orderSlice,
      supplements:supplementslice
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

 