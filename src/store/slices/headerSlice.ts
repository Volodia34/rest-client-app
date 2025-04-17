import { HeaderRest } from '@/types/restClient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  variables: HeaderRest[];
}

const getExistingHeaders = (): HeaderRest[] => {
  try {
    const savedVariables = localStorage.getItem('variables');
    if (!savedVariables) return [];

    const parsed = JSON.parse(savedVariables);
    if (!Array.isArray(parsed)) return [];

    const headers = parsed
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
    return [];
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
    const savedVariables = localStorage.getItem('variables');
    const existingVariables = savedVariables ? JSON.parse(savedVariables) : [];
    const variables = Array.isArray(existingVariables)
      ? existingVariables.filter(
          (item) => typeof item.id === 'string' && !item.id.match(/^\d+$/)
        )
      : [];

    const combined = [...variables, ...headers];
    localStorage.setItem('variables', JSON.stringify(combined));
  } catch (e) {
    console.error('Error saving headers to localStorage:', e);
  }
};

const initialState: HeaderState = {
  variables: getExistingHeaders(),
};

const headerSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeadersFromLS(state, action: PayloadAction<HeaderRest[]>) {
      state.variables = action.payload;
    },
    setNewHeader(state) {
      const nextId = getNextId(state.variables);
      state.variables.push({ id: nextId, key: '', value: '' });
    },
    setUpdateHeaders(state, action: PayloadAction<number>) {
      const headers = state.variables.filter((el) => el.id !== action.payload);
      state.variables = headers;
      saveHeadersToLS(state.variables);
    },
    setUpdateHeaderData(
      state,
      action: PayloadAction<{ data: HeaderRest; index: number }>
    ) {
      const { data, index } = action.payload;
      if (index >= state.variables.length) return;
      state.variables[index] = {
        ...state.variables[index],
        ...data,
      };
      saveHeadersToLS(state.variables);
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
