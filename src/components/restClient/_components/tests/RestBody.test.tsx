import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, UnknownAction } from 'redux';

interface RestSliceType {
  body: string;
  base64EncodedBody: string;
}

const initialState: RestSliceType = {
  body: '',
  base64EncodedBody: '',
};

const restSlice = createSlice({
  name: 'rest',
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
      state.base64EncodedBody = btoa(action.payload);
    },
  },
});

export const { setBody } = restSlice.actions;
export default restSlice.reducer;

const middlewares: Middleware<object, unknown, Dispatch<UnknownAction>>[] = [];

const store = configureStore({
  reducer: {
    rest: restSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

describe('RestBody tests', () => {
  it('should update body and base64EncodedBody when setBody is dispatched', () => {
    const body = '{"key": "value"}';

    store.dispatch(setBody(body));

    const state = store.getState();
    expect(state.rest.body).toEqual(body);
    expect(state.rest.base64EncodedBody).toEqual(btoa(body));
  });

  it('should handle invalid JSON in RestBody and set error message', () => {
    const invalidBody = '{"key": "value"';

    store.dispatch(setBody(invalidBody));
    const state = store.getState();
    expect(state.rest.body).toEqual(invalidBody);
  });
});
