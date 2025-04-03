import { render, screen, fireEvent } from '@testing-library/react';
import RequestSection from '../RequestSection';

const mockChildren = <div className="mock-children">Mock Content</div>;

const mockOnClick = jest.fn();
const mockTitle = 'Request Section Title';
const mockButtonText = 'Click Me';

describe('RequestSection Component', () => {
  beforeEach(() => {
    render(
      <RequestSection
        title={mockTitle}
        buttonText={mockButtonText}
        onClick={mockOnClick}
      >
        {mockChildren}
      </RequestSection>
    );
  });
  test('renders title and children correctly', () => {
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();

    const childrenElement = screen.getByText('Mock Content');
    expect(childrenElement).toBeInTheDocument();
  });

  test('renders button with correct text and handles click', () => {
    const button = screen.getByText(mockButtonText);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

test('does not render button when buttonText is not provided', () => {
  render(<RequestSection title={mockTitle}>{mockChildren}</RequestSection>);

  const button = screen.queryByText(mockButtonText);
  expect(button).toBeNull();
});
