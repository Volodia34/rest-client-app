import { ReactNode } from "react";

interface RequestSectionHeadProps {
  title: string;
  buttonText?: string;
  onClick?: () => void;
  children: ReactNode;
}

const RequestSection = ({ title, buttonText, onClick, children }: RequestSectionHeadProps) => {
  return (
    <div className="request-wrapper">
      <header className="head-wrapper">
        <p className="rest-title">{title}</p>
        {buttonText && <button className="button" onClick={onClick}>{buttonText}</button>}
      </header>
      {children}
    </div>
  );
};

export default RequestSection;
