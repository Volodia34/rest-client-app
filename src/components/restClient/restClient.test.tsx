import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RestClient from './RestClient';
import restReducer from '@/store/slices/restSlice';

const mockStore = configureStore({
  reducer: {
    rest: restReducer,
  },
  preloadedState: {
    rest: {
      body: '',
      base64EncodedBody: '',
      headers: [
        {
          id: 0,
          key: '',
          value: '',
        },
      ],
    },
  },
});

describe('RestClient Component', () => {
  it('renders the RestClient component', async () => {
    render(
      <Provider store={mockStore}>
        <RestClient />
      </Provider>
    );
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(await screen.findByTestId('path-wrapper')).toBeInTheDocument();
    expect(screen.getByText(/Generated request code:/i)).toBeInTheDocument();
    expect(screen.getByText(/Body:/i)).toBeInTheDocument();
  });
});
