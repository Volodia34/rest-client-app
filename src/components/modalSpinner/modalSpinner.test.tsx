import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalSpinner from './ModalSpinner';

describe('ModalSpinner', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(<ModalSpinner isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render spinner overlay when isOpen is true', () => {
    render(<ModalSpinner isOpen={true} />);
    
    const overlay = screen.getByRole('dialog');
    const loader = overlay.querySelector('.modal-spinner__loader');

    expect(overlay).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
