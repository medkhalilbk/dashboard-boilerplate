 
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ClientState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  data: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
    updateClient: (state, action: PayloadAction<any>) => {
      const index = state.data.findIndex((client:any) => client.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteClient: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter((client:any) => client.id !== action.payload.id);
    },
    setClients: (state, action: PayloadAction<any[]>) => {
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

export const { addClient, updateClient, deleteClient, setClients, setLoading, setError } = clientsSlice.actions;

export default clientsSlice.reducer;
