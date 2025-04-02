import { render, screen } from '@testing-library/react';
import RestClient from './RestClient';

describe('RestClient Component', () => {
  it('renders the RestClient component', async () => {
    render(<RestClient />);

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    // expect(screen.getByTestId('select-methods')).toBeInTheDocument();
    expect(await screen.findByTestId('path-wrapper')).toBeInTheDocument();
    expect(screen.getByText(/Generated request code:/i)).toBeInTheDocument();
    expect(screen.getByText(/Body:/i)).toBeInTheDocument();
  });
});