import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from './MainPage';
import { useLanguageContext } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

jest.mock('@/context/LanguageContext');
jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MainPage', () => {
  it('should show login and signup buttons for non-authenticated users', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<MainPage />);

    expect(screen.getByText('main.welcome')).toBeInTheDocument();
    expect(screen.getByText('header.login')).toBeInTheDocument();
    expect(screen.getByText('header.signup')).toBeInTheDocument();

    fireEvent.click(screen.getByText('header.login'));
    expect(pushMock).toHaveBeenCalledWith('/signin');

    fireEvent.click(screen.getByText('header.signup'));
    expect(pushMock).toHaveBeenCalledWith('/signup');
  });

  it('should display personalized welcome message for authenticated users', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: 'John Doe' },
      loading: false,
    });
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<MainPage />);

    expect(screen.getByText('main.welcomeBack')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('main.history')).toBeInTheDocument();
    expect(screen.getByText('main.variables')).toBeInTheDocument();
  });

  it('should replace "%username%" with "Guest" when user displayName is null', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) =>
        key === 'main.welcomeBack' ? 'Welcome back, %username%!' : key,
    });
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: null },
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<MainPage />);

    expect(screen.getByText('Welcome back, Guest!')).toBeInTheDocument();
  });

  it('should render REST Client, History, and Variables links for authenticated users', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: 'John Doe' },
      loading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<MainPage />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('main.history')).toBeInTheDocument();
    expect(screen.getByText('main.variables')).toBeInTheDocument();

    expect(screen.getByText('REST Client').closest('a')).toHaveAttribute(
      'href',
      '/restClient'
    );
    expect(screen.getByText('main.history').closest('a')).toHaveAttribute(
      'href',
      '/historyPage'
    );
    expect(screen.getByText('main.variables').closest('a')).toHaveAttribute(
      'href',
      '/variables'
    );
  });

  it('should navigate to signin page when login button is clicked', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<MainPage />);

    const loginButton = screen.getByText('header.login');
    fireEvent.click(loginButton);

    expect(pushMock).toHaveBeenCalledWith('/signin');
  });

  it('should navigate to signup page when signup button is clicked', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<MainPage />);

    const signupButton = screen.getByText('header.signup');
    fireEvent.click(signupButton);

    expect(pushMock).toHaveBeenCalledWith('/signup');
  });

  it('should not render any content when loading is true', () => {
    (useLanguageContext as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: true });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    render(<MainPage />);

    expect(screen.queryByText('main.welcome')).not.toBeInTheDocument();
    expect(screen.queryByText('header.login')).not.toBeInTheDocument();
    expect(screen.queryByText('header.signup')).not.toBeInTheDocument();
    expect(screen.queryByText('main.welcomeBack')).not.toBeInTheDocument();
    expect(screen.queryByText('REST Client')).not.toBeInTheDocument();
    expect(screen.queryByText('main.history')).not.toBeInTheDocument();
    expect(screen.queryByText('main.variables')).not.toBeInTheDocument();
  });
});
