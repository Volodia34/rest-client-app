import { configureStore } from '@reduxjs/toolkit';
import urlSlice from './slices/urlSlice';
import headerSlice from './slices/headerSlice';
import variablesSlice from './slices/variablesSlice';
import bodySlice from './slices/bodySlice';

export const store = configureStore({
  reducer: {
    headerSlice: headerSlice,
    variablesSlice: variablesSlice,
    bodySlice: bodySlice,
    urlSlice: urlSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
