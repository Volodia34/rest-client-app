'use client';
import Button from '@/UI/buttons/Button';
import { MouseEventHandler } from 'react';

interface RequestSectionProps {
  title: string;
  buttonText?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const RequestSection = ({
  title,
  buttonText,
  onClick,
  children,
}: RequestSectionProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <div className="request-section">
      <div className="rest-title">
        <h3>{title}</h3>
        {buttonText ? (
          <Button className="button" text={buttonText} onClick={handleClick} />
        ) : null}
      </div>
      <div className="request-wrapper">{children}</div>
    </div>
  );
};

export default RequestSection;
