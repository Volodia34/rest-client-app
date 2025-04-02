import { render, screen } from '@testing-library/react';
import Textarea from '../Textarea';

describe('Textarea Component', () => {
  const placeholderText = 'Enter your text here';
  beforeEach(() => {
    render(
      <Textarea
        forInput="test-textarea"
        placeholder={placeholderText}
        customStyle="custom-class"
      />
    );
  });

  test('renders the textarea with placeholder', () => {
    const textarea = screen.getByPlaceholderText(placeholderText);
    expect(textarea).toBeInTheDocument();
  });

  test('textarea is correctly assigned to the given id and name', () => {
    const textarea = screen.getByPlaceholderText('Enter your text here');
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'test-textarea');
  });

  test('applies custom styles', () => {
    const textarea = screen.getByPlaceholderText('Enter your text here');
    expect(textarea.closest('div')).toHaveClass('custom-class');
  });
});
