import { render, screen } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import Variables from '@/components/variables/variables';

jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));
jest.mock('../components/variables/_components/variablesClientContent', () => ({
  VariablesClientContent: jest.fn(() => <div>Variables Client Content</div>),
}));

describe('Variables component', () => {
  it('should render nothing when loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<Variables />);

    expect(screen.queryByText('Variables Client Content')).not.toBeInTheDocument();
  });

  it('should redirect to "/" when no user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<Variables />);

    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('should render VariablesClientContent when user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: 'testUser' },
      loading: false,
    });

    render(<Variables />);

    expect(screen.getByText('Variables Client Content')).toBeInTheDocument();
  });
});
