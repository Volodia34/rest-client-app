import { render, screen, fireEvent } from '@testing-library/react';
import SelectInput from '../SelectInput';

const mockOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('SelectInput Component', () => {
  beforeEach(() => {
    render(
      <SelectInput
        forInput="test"
        type="text"
        placeholder="Select an option"
        options={mockOptions}
      />
    );
  });

  test('renders the input with placeholder', () => {
    const input = screen.getByPlaceholderText('Select an option');
    expect(input).toBeInTheDocument();
  });

  test('displays options when focused', () => {
    const input = screen.getByPlaceholderText('Select an option');
    fireEvent.focus(input);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
