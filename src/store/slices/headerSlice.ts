import { HeaderRest } from '@/types/restClient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  headers: HeaderRest[];
}

const initialHeader: HeaderRest = { id: 0, key: '', value: '' };
const initialState: HeaderState = {
  headers: [initialHeader],
};

const headerSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
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
});

export const { setNewHeader, setUpdateHeaders, setHeaderData } =
  headerSlice.actions;
export default headerSlice.reducer;
