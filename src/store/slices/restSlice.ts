import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestSliceType {
  body: string;
}

const initialState: RestSliceType = {
  body: '',
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    }
  },
  extraReducers: () => {},
});

export const { setBody } = restSlice.actions;
export default restSlice.reducer;
