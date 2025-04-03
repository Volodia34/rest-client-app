import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
  test('renders input with placeholder', () => {
    render(<Input forInput="test" type="text" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });
});
