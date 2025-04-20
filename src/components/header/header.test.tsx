import { render, screen, fireEvent, act } from '@testing-library/react';
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
        case 'header.mainpage':
          return 'Main Page';
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
  }) => {
    const { priority, ...rest } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...rest}
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        data-priority={priority ? 'true' : undefined}
      />
    );
  },
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  const renderHeader = async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
    });
    return renderResult!;
  };

  it('renders header with all elements', async () => {
    await renderHeader();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('applies sticky class on scroll', async () => {
    await renderHeader();
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('sticky');

    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 10 });
      fireEvent.scroll(window);
    });

    expect(header).toHaveClass('sticky');
  });

  it('removes scroll event listener on unmount', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = await renderHeader();

    await act(async () => {
      unmount();
    });

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });

  it('handles language toggle', async () => {
    await renderHeader();
    const langButton = screen.getByText('EN');

    await act(async () => {
      fireEvent.click(langButton);
    });

    expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
  }); 
});
