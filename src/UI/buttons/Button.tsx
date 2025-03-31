import { FC } from 'react';

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

export default Button;
