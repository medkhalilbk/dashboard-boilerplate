import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import  stackSlice  from './features/stackSlice';

import { Reducer } from 'redux'; // Import Reducer from redux
import companySlice from './features/companySlice';

export const store = () => {
  return configureStore({
    reducer: {
      user: userSlice, 
      stacks: stackSlice, // Use stackSlice.reducer instead of stackSlice
      company:companySlice
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];