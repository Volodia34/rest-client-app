import { encodeBase64 } from '@/helpers/encodeBase64';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestSliceType {
  body: string;
  base64EncodedBody: string;
}

const initialState: RestSliceType = {
  body: '',
  base64EncodedBody: ''
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
      state.base64EncodedBody = encodeBase64(action.payload);
    }
  },
  extraReducers: () => {},
});

export const { setBody } = restSlice.actions;
export default restSlice.reducer;
