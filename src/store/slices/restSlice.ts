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

const headItem: Header = {
  id: 0,
  key: '',
  value: '',
};

const initialState: RestSliceType = {
  body: '',
  base64EncodedBody: '',
  headers: [headItem],
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
      action: PayloadAction<{ data: Header; index: number }>
    ) {
      state.headers[action.payload.index].key = action.payload.data.key;
      state.headers[action.payload.index].value = action.payload.data.value;
    },
  },
  extraReducers: () => {},
});

export const { setBody, setNewHeader, setHeaderData, setUpdateHeaders } =
  restSlice.actions;
export default restSlice.reducer;
