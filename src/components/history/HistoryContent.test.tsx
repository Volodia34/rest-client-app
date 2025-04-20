import { render, screen } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import HistoryContent from './historyContent';

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('./_components/historyClientContent', () => ({
  HistoryClientContent: () => <div>HistoryClientContent</div>,
}));

describe('HistoryContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing while loading', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: true });

    const { container } = render(<HistoryContent />);
    expect(container).toBeEmptyDOMElement();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('redirects to "/" if user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });

    render(<HistoryContent />);
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('renders HistoryClientContent if user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '1', name: 'Asel' },
      loading: false,
    });

    render(<HistoryContent />);
    expect(screen.getByText('HistoryClientContent')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });
});
