import { getFromLocalStorage, saveToLocalStorage } from '@/helpers/localActions';
import { HeaderRest } from '@/types/restClient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  headers: HeaderRest[];
}

const getExistingHeaders = (): HeaderRest[] => {
  try {
    const savedHeadersles = getFromLocalStorage('headers');
    if (!savedHeadersles) return [{ id: 1, key: '', value: '' }];

    if (!Array.isArray(savedHeadersles)) return [{ id: 1, key: '', value: '' }];

    const headers = savedHeadersles
      .filter((item) => {
        const id = typeof item.id === 'string' ? parseInt(item.id) : item.id;
        return !isNaN(id);
      })
      .map((item) => ({
        ...item,
        id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
      }));

    return headers;
  } catch (e) {
    console.error('Error loading headers from localStorage:', e);
    return [{ id: 1, key: '', value: '' }];
  }
};

const getNextId = (headers: HeaderRest[]): number => {
  if (headers.length === 0) return 1;
  const allIds = headers.map((header) =>
    typeof header.id === 'string' ? parseInt(header.id) : header.id
  );
  return Math.max(...allIds) + 1;
};

const saveHeadersToLS = (headers: HeaderRest[]) => {
  if (typeof window === 'undefined') return;

  try {
    const savedHeaderles = getFromLocalStorage('headers');
    const existingVariables = savedHeaderles ?? [];
    const variables = Array.isArray(existingVariables)
      ? existingVariables.filter(
          (item) => typeof item.id === 'string' && !item.id.match(/^\d+$/)
        )
      : [];

    const combined = [...variables, ...headers];
    saveToLocalStorage('headers', combined);
  } catch (e) {
    console.error('Error saving headers to localStorage:', e);
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
      const nextId = getNextId(state.headers);
      state.headers.push({ id: nextId, key: '', value: '' });
    },
    setUpdateHeaders(state, action: PayloadAction<number>) {
      const headers = state.headers.filter((el) => el.id !== action.payload);
      state.headers = headers;
      saveHeadersToLS(state.headers);
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
      saveHeadersToLS(state.headers);
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
