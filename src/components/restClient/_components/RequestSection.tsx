import { RequestSectionHeadProps } from '@/types/restClient';
import Button from '@/UI/buttons/Button';

const RequestSection = ({
  title,
  buttonText,
  onClick,
  children,
}: RequestSectionHeadProps) => {
  return (
    <div className="request-wrapper">
      <header className="head-wrapper">
        <p className="rest-title">{title}</p>
        {buttonText && (
          <Button className="button" text={buttonText} onClick={onClick} />
        )}
      </header>
      {children}
    </div>
  );
};

export default RequestSection;
