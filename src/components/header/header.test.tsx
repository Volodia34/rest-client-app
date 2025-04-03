import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { LanguageProvider } from '@/context/LanguageContext';

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


  beforeEach(() => {

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
  });

  it('renders header with all elements', () => {
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
    const { unmount } = render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

 it('handles button clicks', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    fireEvent.click(screen.getByText('Login'));
    expect(alertMock).toHaveBeenCalledWith('Login clicked');

    fireEvent.click(screen.getByText('Sign Up'));
    expect(alertMock).toHaveBeenCalledWith('Sign Up clicked');

    alertMock.mockRestore();
  });
});
