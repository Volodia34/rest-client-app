import { encodeBase64 } from '@/helpers/encodeBase64';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UrlParams {
  baseUrl: string;
  endpoint: string;
  endpointEnCode: string;
  params: string;
  encodeParams: string;
  urlValueInput: string;
}

const initialState: UrlParams = {
  baseUrl: '',
  endpoint: '',
  endpointEnCode: '',
  params: '',
  encodeParams: '',
  urlValueInput: '',
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setBaseUrl(state, action: PayloadAction<string>) {
      state.baseUrl = action.payload;
    },
    setEndpoint(state, action: PayloadAction<string>) {
      state.endpoint = action.payload.split('?')[0];
      state.endpointEnCode = state.endpoint
        .split('/')
        .map(encodeBase64)
        .join('/');
    },
    setParamsAndEncode(state, action: PayloadAction<{ params: string }>) {
      const { params } = action.payload;
      state.params = params;
      state.params = encodeBase64(params);
      state.encodeParams = encodeBase64(params);
    },
    setUrlValueInput(state, action: PayloadAction<string>) {
      state.urlValueInput = action.payload;
    },
  },
});

export const { setBaseUrl, setEndpoint, setParamsAndEncode, setUrlValueInput } =
  urlSlice.actions;
export default urlSlice.reducer;
