import { ChangeEvent, MouseEvent, FocusEvent } from 'react';

export interface BaseInputType {
  forInput: string;
  placeholder?: string;
  customStyle?: string;
  value?: string;
}

export interface TextareaType extends BaseInputType {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export interface SelectInputType extends BaseInputType {
  type: string;
  options: string[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (e: MouseEvent<HTMLElement>) => void;
}

export interface InputType extends BaseInputType {
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
