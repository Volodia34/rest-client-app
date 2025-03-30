'use client';

import { FC } from 'react';
import './inputs.scss';

interface SelectInputType {
  forInput: string;
  placeholder?: string;
  type: string;
  options: string[];
  customStyle?: string;
  value?: string;
}

const SelectInput: FC<SelectInputType> = ({
  forInput,
  type,
  options,
  placeholder,
  customStyle,
  value,
}) => {
  return (
    <div className={`input-container ${customStyle}`}>
      <input
        id={forInput}
        type={type}
        list="method-list"
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => console.log(e.target.value)}
        onFocus={() => console.log(true)}
        onBlur={() => setTimeout(() => console.log(false), 200)}
      />
      {options && (
        <ul className="datalist">
          {options.map((opt, idx) => (
            <li
              key={idx}
              className="datalist-item"
              onMouseDown={() => console.log(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
