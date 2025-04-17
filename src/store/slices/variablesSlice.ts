import { saveToLocalStorage } from '@/helpers/localActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'variables';

interface HeaderState {
  variables: {[key: string]: string};
}

const initialState: HeaderState = {
  variables: {},
};

const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setVariables(state, action: PayloadAction<{key: string, value: string}>) {
      state.variables[action.payload.key] = action.payload.value;
      const updated = { ...state.variables, [action.payload.key]: action.payload.value };
      saveToLocalStorage(STORAGE_KEY, updated);
    },
  },
});

export const { setVariables} = variablesSlice.actions;
export default variablesSlice.reducer;

