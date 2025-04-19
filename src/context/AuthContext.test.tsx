import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider, useAuthContext } from './useAuthContext';

jest.mock('@/hooks/useAuth');

describe('AuthProvider и useAuthContext', () => {
  const mockAuthValue = {
    user: { id: '1', name: 'Asel' } as unknown, // или используй User, если интерфейс правильный
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue(mockAuthValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('предоставляет значения из useAuth через контекст', () => {
    const TestComponent = () => {
      return <div>Привет, Asel</div>;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Привет, Asel')).toBeInTheDocument();
  });

  it('выбрасывает ошибку, если useAuthContext используется вне AuthProvider', () => {
    const TestComponent = () => {
      // это вызовет ошибку
      useAuthContext();
      return null;
    };

    // перехват ошибки в консоли
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useAuthContext must be used within an AuthProvider'
    );

    consoleError.mockRestore();
  });
});
