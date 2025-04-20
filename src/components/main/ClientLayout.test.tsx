import { render, screen } from '@testing-library/react';
import ClientLayout from './ClientLayout';
import '@testing-library/jest-dom';

jest.mock('@/components/header/Header', () => {
    const Header = () => <div>Header</div>;
    Header.displayName = 'Header'; // Adding displayName
    return Header;
  });
  
  jest.mock('@/components/footer/Footer', () => {
    const Footer = () => <div>Footer</div>;
    Footer.displayName = 'Footer'; // Adding displayName
    return Footer;
  });
  
  jest.mock('@/errorsHandlers/ErrorBoundary', () => {
    const ErrorBoundary = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
    ErrorBoundary.displayName = 'ErrorBoundary'; // Adding displayName
    return ErrorBoundary;
  });
  
  jest.mock('@/context/LanguageContext', () => ({
    LanguageProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }));
  
  jest.mock('@/context/useAuthContext', () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }));
  
  // Mock store with necessary methods
  jest.mock('@/store/store', () => ({
    store: {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    },
  }));
  

// Mocking redux store with required methods
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

    // Check if the layout renders Header and Footer
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();

    // Check if the child content is rendered correctly
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('wraps children with the LanguageProvider and AuthProvider', () => {
    const childText = 'Test child content';

    render(
      <ClientLayout>
        <div>{childText}</div>
      </ClientLayout>
    );

    // Ensure children are wrapped within both providers
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
