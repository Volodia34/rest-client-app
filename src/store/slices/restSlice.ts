import { encodeBase64 } from '@/helpers/encodeBase64';
import { HeaderRest, Options } from '@/types/restClient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestSliceType {
  body: string;
  method: string;
  baseUrl: string;
  endpoint: string;
  endpointEnCode: string;
  params: string;
  encodeParams: string;
  urlValueInput: string;
  language: string;
  base64EncodedBody: string;
  headers: HeaderRest[];
  formatBody: Options;
}

const initialHeader: HeaderRest = { id: 0, key: '', value: '' };

const initialState: RestSliceType = {
  body: '',
  base64EncodedBody: '',
  headers: [initialHeader],
  method: 'GET',
  language: 'JavaScript-Fetch',
  baseUrl: '',
  endpoint: '',
  endpointEnCode: '',
  params: '',
  encodeParams: '',
  urlValueInput: '',
  formatBody: 'JSON',
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setFormatBody(state, action: PayloadAction<'JSON' | 'Text' | ''>) {
      state.formatBody = action.payload;
    },
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
      state.endpoint = action.payload.split('?')[0];
      state.endpointEnCode = state.endpoint
        .split('/')
        .map((el) => encodeBase64(el))
        .join('/');
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setUrlValueInput(state, action: PayloadAction<string>) {
      state.urlValueInput = action.payload;
    },
    setParamsAndEncode(state, action: PayloadAction<{ params: string }>) {
      const { params } = action.payload;
      state.params = params;
      const originalParams = new URLSearchParams(action.payload);
      const encodedParams = new URLSearchParams();

      originalParams.forEach((value, key) => {
        const encodedValue = encodeBase64(value);
        encodedParams.set(key, encodedValue);
      });

      state.encodeParams = `?${encodedParams.toString()}`;
    },
    setNewHeader(state) {
      state.headers.push({ id: state.headers.length, key: '', value: '' });
    },
    setUpdateHeaders(state, action: PayloadAction<number>) {
      const headers = state.headers.filter((el) => el.id !== action.payload);
      state.headers = !headers.length ? [initialHeader] : headers;
    },
    setHeaderData(
      state,
      action: PayloadAction<{ data: HeaderRest; index: number }>
    ) {
      const { key, value } = action.payload.data;
      const { index } = action.payload;
      if (state.headers[index]) {
        state.headers[index] = { ...state.headers[index], key, value };
      }
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
  setParamsAndEncode,
  setLanguage,
  setUrlValueInput,
  setFormatBody,
} = restSlice.actions;
export default restSlice.reducer;
