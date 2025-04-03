import { render, screen } from '@testing-library/react';
import GeneratedCode from '../GeneratedCode';

const mockTitle = 'Generated Code';
const mockCode = 'const foo = "bar";';
const mockButtonText = 'Copy Code';

describe('GeneratedCode Component', () => {
  beforeEach(() => {
    render(
      <GeneratedCode
        title={mockTitle}
        code={mockCode}
        buttonText={mockButtonText}
      />
    );
  });
  test('renders the title correctly', () => {
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the code correctly', () => {
    const codeElement = screen.getByText(mockCode);
    expect(codeElement).toBeInTheDocument();
  });

  test('renders the button with the correct text', () => {
    const buttonElement = screen.getByText(mockButtonText);
    expect(buttonElement).toBeInTheDocument();
  });
});
