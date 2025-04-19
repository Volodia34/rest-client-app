import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useLanguageContext } from '@/context/LanguageContext';
import AuthLinks from './AuthLinks';

jest.mock('@/context/LanguageContext', () => ({
  useLanguageContext: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthLinks', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  const renderComponent = (props = {}) => render(<AuthLinks {...props} />);

  it('renders all default links', () => {
    renderComponent();

    expect(screen.getByText('main.history')).toBeInTheDocument();
    expect(screen.getByText('main.variables')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
  });

  it('hides REST Client link when restClient is true', () => {
    renderComponent({ restClient: true });

    expect(screen.queryByText('REST Client')).not.toBeInTheDocument();
    expect(screen.getByText('main.history')).toBeInTheDocument();
  });

  it('calls router.push on link click and shows spinner', () => {
    renderComponent();

    fireEvent.click(screen.getByText('REST Client'));

    expect(push).toHaveBeenCalledWith('/restClient');
    expect(screen.getByTestId('modal-spinner')).toBeInTheDocument();
  });
});
