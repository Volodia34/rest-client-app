'use client';

import { FC, useState } from 'react';
import './inputs.scss';
import { SelectInputType } from '@/types/input';

const SelectInput: FC<SelectInputType> = ({
  forInput,
  type,
  options,
  placeholder,
  customStyle,
  value,
  onChange,
  onSelect,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <div className={`input-container ${customStyle}`}>
      <input
        id={forInput}
        type={type}
        list="method-list"
        className="input select-input"
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        autoComplete="off"
        onFocus={() => setIsListOpen(true)}
        onBlur={() => setTimeout(() => setIsListOpen(false), 200)}
      />
      {isListOpen && options && (
        <ul className="datalist">
          {options.map((opt, idx) => (
            <li
              key={idx}
              className="datalist-item"
              id={opt}
              onClick={onSelect}
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
