import { encodeBase64 } from '@/helpers/encodeBase64';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Header {
  id: number;
  key: string;
  value: string;
}

interface RestSliceType {
  body: string;
  base64EncodedBody: string;
  headers: Header[];
}

const initialState: RestSliceType = {
  body: '',
  base64EncodedBody: '',
  headers: [{
    id: 0,
    key: '',
    value: '',
  }]
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
      state.base64EncodedBody = encodeBase64(action.payload);
    },
    setNewHeader(state) {
      state.headers.push({
        id: state.headers.length,
        key: '',
        value: '',
      })
    },
    setHeaderData(state, action: PayloadAction<Header>) {
      state.headers[action.payload.id].key = action.payload.key
      state.headers[action.payload.id].value = action.payload.value
    },
  },
  extraReducers: () => {},
});

export const { setBody, setNewHeader, setHeaderData } = restSlice.actions;
export default restSlice.reducer;
