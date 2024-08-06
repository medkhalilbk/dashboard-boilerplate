// src/slices/companySlice.ts

import { ICompany, IDay } from '@/types/company';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CompanyState {
  data: ICompany[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  data: [],
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.data.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<ICompany>) => {
      const index = state.data.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteCompany: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter(company => company.id !== action.payload.id);
    },
    setCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addCompany, updateCompany, deleteCompany, setCompanies, setLoading, setError } = companySlice.actions;

export default companySlice.reducer;
