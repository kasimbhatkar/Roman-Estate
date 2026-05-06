import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PropertyState {
  properties: any[];
  currentProperty: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => {
    const response = await axios.get('/api/properties');
    return response.data;
  }
);

export const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setCurrentProperty: (state, action: PayloadAction<any>) => {
      state.currentProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      });
  },
});

export const { setCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer;
