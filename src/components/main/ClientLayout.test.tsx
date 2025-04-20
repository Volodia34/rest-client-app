import { render, screen } from '@testing-library/react';
import ClientLayout from './ClientLayout';
import '@testing-library/jest-dom';

jest.mock('@/components/header/Header', () => {
  const Header = () => <div>Header</div>;
  Header.displayName = 'Header';
  return Header;
});

jest.mock('@/components/footer/Footer', () => {
  const Footer = () => <div>Footer</div>;
  Footer.displayName = 'Footer';
  return Footer;
});

jest.mock('@/errorsHandlers/ErrorBoundary', () => {
  const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  ErrorBoundary.displayName = 'ErrorBoundary';
  return ErrorBoundary;
});

jest.mock('@/context/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/context/useAuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/store/store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
  },
}));

jest.mock('@/store/store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
  },
}));

describe('ClientLayout', () => {
  it('renders layout with children and all providers', () => {
    const childText = 'Test child content';

    render(
      <ClientLayout>
        <div>{childText}</div>
      </ClientLayout>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('wraps children with the LanguageProvider and AuthProvider', () => {
    const childText = 'Test child content';

    render(
      <ClientLayout>
        <div>{childText}</div>
      </ClientLayout>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
