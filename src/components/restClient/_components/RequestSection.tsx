import Button from "@/UI/buttons/Button";
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
        {buttonText && <Button
          className="button"
          text={buttonText}
          onClick={onClick}
        />}
      </header>
      {children}
    </div>
  );
};

export default RequestSection;
