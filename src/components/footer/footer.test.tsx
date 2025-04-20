import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

jest.mock('next/image', () => ({
  __esModule: true,

  default: (props: {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    width?: number;
    height?: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  ),
}));

jest.mock('@/constants/developers', () => ({
  developers: [
    { name: 'Dev1', url: 'https://github.com/dev1' },
    { name: 'Dev2', url: 'https://github.com/dev2' },
    { name: 'Dev3', url: 'https://github.com/dev3' },
  ],
}));

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders copyright text', () => {
    expect(
      screen.getByText('© 2025 All rights reserved.')
    ).toBeInTheDocument();
  });

  it('renders all developer links', () => {
    const developerLinks = screen.getAllByRole('link');
    expect(developerLinks).toHaveLength(4);
  });

  it('renders developer names and GitHub icons', () => {
    ['Dev1', 'Dev2', 'Dev3'].forEach((name) => {
      const developerName = screen.getByText(name);
      expect(developerName).toBeInTheDocument();

      const githubIcon = screen.getByAltText(`${name}'s GitHub`);
      expect(githubIcon).toBeInTheDocument();
    });
  });

  it('renders RS School link with correct attributes', () => {
    const rsLink = screen.getByRole('link', { name: /rs school/i });
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders developer links with correct attributes', () => {
    ['dev1', 'dev2', 'dev3'].forEach((dev) => {
      const link = screen.getByRole('link', { name: new RegExp(dev, 'i') });
      expect(link).toHaveAttribute('href', `https://github.com/${dev}`);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('applies correct CSS modules classes', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer.className).toContain('footer');
    expect(
      screen.getByText('© 2025 All rights reserved.').className
    ).toContain('copy');
  });
});
