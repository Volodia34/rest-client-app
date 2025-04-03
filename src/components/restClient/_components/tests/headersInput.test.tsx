import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HeadersInput from '../headers/HeadersInput';
import restReducer from '@/store/slices/restSlice';

const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: { rest: restReducer },
    preloadedState,
  });

describe('HeadersInput Component', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore({
      rest: {
        headers: [
          { id: 0, key: 'Content-Type', value: 'application/json' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <HeadersInput id={0} index={0} />
      </Provider>
    );
  });

  test('Displays the header key and value correctly', () => {
    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
  });

  test('Triggers removeRow function on Remove button click', async () => {
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(store.getState().rest.headers.length).toBe(1);
    });
  });

  test('Changes the header value correctly', () => {
    const inputValue = screen.getByDisplayValue('application/json');
    fireEvent.change(inputValue, { target: { value: 'text/plain' } });
    expect(store.getState().rest.headers[0].value).toBe('text/plain');
  });
});
