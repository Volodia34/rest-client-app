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

  it('hides History link when historyPage is true', () => {
    renderComponent({ historyPage: true });

    expect(screen.queryByText('main.history')).not.toBeInTheDocument();
    expect(screen.getByText('main.variables')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
  });

  it('hides Variables link when variables is true', () => {
    renderComponent({ variables: true });

    expect(screen.queryByText('main.variables')).not.toBeInTheDocument();
    expect(screen.getByText('main.history')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
  });

  it('renders no links if all props are true', () => {
    renderComponent({ restClient: true, historyPage: true, variables: true });

    expect(screen.queryByText('main.variables')).not.toBeInTheDocument();
    expect(screen.queryByText('main.history')).not.toBeInTheDocument();
    expect(screen.queryByText('REST Client')).not.toBeInTheDocument();
  });

  it('sets loading to true when a link is clicked', () => {
    renderComponent();
    const link = screen.getByText('REST Client');
    fireEvent.click(link);
    expect(screen.getByTestId('modal-spinner')).toBeInTheDocument();
  });
});
