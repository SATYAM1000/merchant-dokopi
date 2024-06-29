import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPricing = createAsyncThunk(
  'pricing/fetchPricing',
  async (storeId) => {
    const response = await axios.get(`/api/pricing/${storeId}`);
    return response.data;
  }
);

const pricingSlice = createSlice({
  name: 'pricing',
  initialState: {
    pricing: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPricingEntry: (state, action) => {
      state.pricing.push(action.payload);
    },
    removeCondition: (state, action) => {
      const { pricingIndex, conditionIndex } = action.payload;
      state.pricing[pricingIndex].conditions = state.pricing[pricingIndex].conditions.filter((_, index) => index !== conditionIndex);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricing.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPricing.fulfilled, (state, action) => {
        state.pricing = action.payload;
        state.loading = false;
      })
      .addCase(fetchPricing.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addPricingEntry, removeCondition } = pricingSlice.actions;

export default pricingSlice.reducer;
