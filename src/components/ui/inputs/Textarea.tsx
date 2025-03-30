import { FC } from 'react';
import './inputs.scss';

interface SelectInputType {
  forInput: string;
  placeholder?: string;
  customStyle?: string;
}

const Textarea: FC<SelectInputType> = ({
  forInput,
  placeholder,
  customStyle,
}) => {
  return (
    <div className={`input-container ${customStyle}`}>
      <textarea
        id={forInput}
        name={forInput}
        placeholder={placeholder}
        className="textarea"
      ></textarea>
    </div>
  );
};

export default Textarea;
