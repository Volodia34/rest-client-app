import { encodeBase64 } from '@/helpers/encodeBase64';
import { HeaderRest } from '@/types/restClient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestSliceType {
  body: string;
  method: string;
  baseUrl: string;
  endpoint: string;
  params: string;
  language: string;
  base64EncodedBody: string;
  headers: HeaderRest[];
}

const headItem: HeaderRest = {
  id: 0,
  key: '',
  value: '',
};

const initialState: RestSliceType = {
  body: '',
  base64EncodedBody: '',
  headers: [headItem],
  method: 'GET',
  language: 'JavaScript (Fetch api)',
  baseUrl: '',
  endpoint: '',
  params: '',
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
      state.base64EncodedBody = encodeBase64(action.payload);
    },
    setMethod(state, action: PayloadAction<string>) {
      state.method = action.payload;
    },
    setBaseUrl(state, action: PayloadAction<string>) {
      state.baseUrl = action.payload;
    },
    setEndpoint(state, action: PayloadAction<string>) {
      state.endpoint = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setParams(state, action: PayloadAction<string>) {
      state.params = action.payload;
    },
    setNewHeader(state) {
      state.headers.push({
        id: state.headers.length,
        key: '',
        value: '',
      });
    },
    setUpdateHeaders(state, action: PayloadAction<number>) {
      if (state.headers.length !== 1) {
        state.headers = state.headers.filter((el) => el.id !== action.payload);
      } else {
        state.headers = [headItem];
      }
    },
    setHeaderData(
      state,
      action: PayloadAction<{ data: HeaderRest; index: number }>
    ) {
      state.headers[action.payload.index].key = action.payload.data.key;
      state.headers[action.payload.index].value = action.payload.data.value;
    },
  },
  extraReducers: () => {},
});

export const {
  setBody,
  setNewHeader,
  setHeaderData,
  setUpdateHeaders,
  setMethod,
  setBaseUrl,
  setEndpoint,
  setParams,
  setLanguage,
} = restSlice.actions;
export default restSlice.reducer;
