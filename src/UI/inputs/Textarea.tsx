import { FC } from 'react';
import './inputs.scss';
import { TextareaType } from '@/types/input';

const Textarea: FC<TextareaType> = ({
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
