import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RequestHeaders from '../RequestHeaders';
import restReducer, { setNewHeader } from '@/store/slices/restSlice';

const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: { rest: restReducer },
    preloadedState,
  });

describe('RequestHeaders Component', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore({
      rest: {
        body: '',
        base64EncodedBody: '',
        headers: [{ id: 0, key: '', value: '' }],
      },
    });

    render(
      <Provider store={store}>
        <RequestHeaders />
      </Provider>
    );
  });

  test('Displays the title and the button', () => {
    expect(screen.getByText('Headers:')).toBeInTheDocument();
    expect(screen.getByText('Add Header')).toBeInTheDocument();
  });

  test('Renders the initial header', () => {
    expect(screen.getAllByTestId('headers-inputs')).toHaveLength(1);
  });

  test('Adds a new header when clicking on Add Header', async () => {
    fireEvent.click(screen.getByText('Add Header'));
    store.dispatch(setNewHeader());
    expect(screen.getAllByTestId('headers-inputs')).toHaveLength(2);
  });
});
