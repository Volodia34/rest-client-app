import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { LanguageProvider } from '@/context/LanguageContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

const mockToggleLanguage = jest.fn();
jest.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    currentLang: 'EN',
    toggleLanguage: mockToggleLanguage,
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

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  const renderHeader = () => {
    return render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
  };

  it('renders header with all elements', () => {
    renderHeader();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('applies sticky class on scroll', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('sticky');

    Object.defineProperty(window, 'scrollY', { value: 10 });
    fireEvent.scroll(window);

    expect(header).toHaveClass('sticky');
  });

  it('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHeader();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });

  it('handles language toggle', () => {
    renderHeader();
    const langButton = screen.getByText('EN');

    fireEvent.click(langButton);

    expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
  });
});
