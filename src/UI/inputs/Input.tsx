import { FC } from 'react';
import './inputs.scss';
import { InputType } from '@/types/input';

const Input: FC<InputType> = ({
  forInput,
  type,
  placeholder,
  customStyle,
  value,
  onChange,
}) => {
  return (
    <div className={`input-container ${customStyle}`}>
      <input
        id={forInput}
        type={type}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => console.log(true)}
      />
    </div>
  );
};

export default Input;
