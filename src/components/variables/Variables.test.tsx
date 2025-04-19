import { render, screen } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import Variables from './variables';

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('./_components/variablesClientContent', () => ({
  VariablesClientContent: () => <div>VariablesClientContent</div>,
}));

describe('Variables', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('возвращает null при loading = true', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: true });

    const { container } = render(<Variables />);
    expect(container).toBeEmptyDOMElement();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('делает redirect("/") если user отсутствует', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });

    render(<Variables />);
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('рендерит VariablesClientContent если user существует', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', name: 'Asel' },
      loading: false,
    });

    render(<Variables />);
    expect(screen.getByText('VariablesClientContent')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });
});
