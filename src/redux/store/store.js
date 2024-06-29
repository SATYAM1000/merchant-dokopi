import { configureStore } from '@reduxjs/toolkit';
import pricingReducer from './pricingSlice';

export const store = configureStore({
  reducer: {
    pricing: pricingReducer,
  },
});

