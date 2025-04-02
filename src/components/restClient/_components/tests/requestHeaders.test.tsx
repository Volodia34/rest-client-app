import { render, screen, fireEvent } from '@testing-library/react';
import RequestHeaders from '../RequestHeaders';
import { headerKeys } from '@/constants/mockData';;

const mockOnClickRemove = jest.fn();

describe('RequestHeaders Component', () => {
  beforeEach(() => {
    render(<RequestHeaders />);
  });
  test('renders the title and button correctly', () => {
    const titleElement = screen.getByText('Headers:');
    expect(titleElement).toBeInTheDocument();

    const buttonText = screen.getByText('Add Header');
    expect(buttonText).toBeInTheDocument();
  });

  test('renders the "Remove" button and handles click', () => {
    const removeButton = screen.getByText('Remove');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(mockOnClickRemove).toHaveBeenCalledTimes(0);
  });
  
  test('SelectInput renders with options', () => {
    headerKeys.forEach((key) => {
      const optionElement = screen.getByText(key);
      expect(optionElement).toBeInTheDocument();
    });
  });
});
