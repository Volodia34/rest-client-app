'use client';
import { FC } from 'react';
import './inputs.scss';
import { TextareaType } from '@/types/input';

const Textarea: FC<TextareaType> = ({
  value,
  forInput,
  placeholder,
  customStyle,
  onChange,
}) => {
  return (
    <div className={`input-container ${customStyle}`}>
      <textarea
        id={forInput}
        value={value}
        name={forInput}
        placeholder={placeholder}
        onChange={onChange}
        className="textarea"
      ></textarea>
    </div>
  );
};

export default Textarea;
