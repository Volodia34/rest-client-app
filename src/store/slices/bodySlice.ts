import { decodeBase64, encodeBase64 } from '@/helpers/encodeBase64';
import { getFromLocalStorage, saveToLocalStorage } from '@/helpers/localActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestBody {
  body: string;
  base64EncodedBody: string;
  method: string;
  language: string;
  formatBody: string;
}

const initialState: RequestBody = {
  body: getFromLocalStorage('body') ? decodeBase64(getFromLocalStorage('body') as string) : '',
  base64EncodedBody: '',
  method: 'GET',
  language: 'JavaScript-Fetch',
  formatBody: 'JSON',
};

const bodySlice = createSlice({
  name: 'body',
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
      state.base64EncodedBody = encodeBase64(action.payload);
      saveToLocalStorage('body', state.base64EncodedBody)
    },
    setMethod(state, action: PayloadAction<string>) {
      state.method = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setFormatBody(state, action: PayloadAction<'JSON' | 'Text' | ''>) {
      state.formatBody = action.payload;
    },
  },
});

export const { setBody, setMethod, setLanguage, setFormatBody } =
  bodySlice.actions;
export default bodySlice.reducer;
