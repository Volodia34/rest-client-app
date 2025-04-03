import { configureStore } from '@reduxjs/toolkit';
import restReducer from './slices/restSlice'

export const store = configureStore({
  reducer: {
    restReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
