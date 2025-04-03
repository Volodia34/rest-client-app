import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { useRouter } from 'next/navigation';

jest.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    currentLang: 'EN',
    toggleLanguage: jest.fn(),
    t: (key: string) => {
      switch (key) {
        case 'header.login':
          return 'Login';
        case 'header.signup':
          return 'Sign Up';
        case 'header.logout':
          return 'Logout';
        default:
          return key;
      }
    },
  }),
}));

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header Component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
    render(<Header />);
  });

  it('renders header with all elements', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('applies sticky class on scroll', () => {
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('sticky');

    Object.defineProperty(window, 'scrollY', { value: 10 });
    fireEvent.scroll(window);

    expect(header).toHaveClass('sticky');
  });

  it('removes scroll event listener on unmount', () => {
    const { unmount } = render(<Header />);
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('handles button clicks', () => {
    fireEvent.click(screen.getByText('Login'));
    expect(mockRouterPush).toHaveBeenCalledWith('/signin');

    fireEvent.click(screen.getByText('Sign Up'));
    expect(mockRouterPush).toHaveBeenCalledWith('/signup');
  });
});
