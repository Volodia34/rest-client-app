import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/helpers/localActions';
import { HeaderRest } from '@/types/restClient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialHeadr = [{ id: 0, key: '', value: '' }];

interface HeaderState {
  headers: HeaderRest[];
}

const getExistingHeaders = (): HeaderRest[] => {
  if (typeof window === 'undefined') return initialHeadr;
  try {
    const data = getFromLocalStorage('headers') as HeaderRest[] | null;
    if (data && data.length) return data;
    return initialHeadr;
  } catch (e) {
    console.error('Error loading headers from localStorage:', e);
    return initialHeadr;
  }
};

const initialState: HeaderState = {
  headers: getExistingHeaders(),
};

const headerSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeadersFromLS(state, action: PayloadAction<HeaderRest[]>) {
      state.headers = action.payload;
    },
    setNewHeader(state) {
      const nextId = state.headers.length;
      state.headers = Array.isArray(state.headers)
        ? [...state.headers, { id: nextId, key: '', value: '' }]
        : initialHeadr;
    },
    setUpdateHeaders(state, action: PayloadAction<number>) {
      const headers = state.headers.filter((el) => el.id !== action.payload);
      state.headers = headers;
      saveToLocalStorage('headers', state.headers);
    },
    setUpdateHeaderData(
      state,
      action: PayloadAction<{ data: HeaderRest; index: number }>
    ) {
      const { data, index } = action.payload;
      if (index >= state.headers.length) return;
      state.headers[index] = {
        ...state.headers[index],
        ...data,
      };
      saveToLocalStorage('headers', state.headers);
    },
  },
});

export const {
  setNewHeader,
  setUpdateHeaders,
  setUpdateHeaderData,
  setHeadersFromLS,
} = headerSlice.actions;
export default headerSlice.reducer;
