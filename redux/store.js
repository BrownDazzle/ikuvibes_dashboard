"use client"
import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreApi } from './services/shazamCore';
import playerReducer from './features/playerSlice';
import uploadSlice from './features/uploadSlice';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    upload: uploadSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
