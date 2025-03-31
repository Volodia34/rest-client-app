import { FC } from 'react';
import './inputs.scss';
import { InputType } from '@/types/input';

const Input: FC<InputType> = ({
  forInput,
  type,
  placeholder,
  customStyle,
  value,
}) => {
  return (
    <div className={`input-container ${customStyle}`}>
      <input
        id={forInput}
        type={type}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => console.log(e.target.value)}
        onFocus={() => console.log(true)}
      />
    </div>
  );
};

export default Input;
