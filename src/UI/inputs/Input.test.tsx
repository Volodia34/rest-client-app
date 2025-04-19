import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    forInput: 'email',
    type: 'text',
    placeholder: 'Enter email',
    customStyle: 'custom-class',
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct placeholder and class', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
  });

  it('applies custom class to wrapper', () => {
    render(<Input {...defaultProps} />);
    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('input-container custom-class');
  });

  it('calls onChange when typing', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('has correct type and value', () => {
    render(<Input {...defaultProps} value="some value" />);
    const input = screen.getByDisplayValue('some value');
    expect(input).toHaveAttribute('type', 'text');
  });
});
