import { ChangeEvent, MouseEvent, FocusEvent, KeyboardEvent } from 'react';

export interface BaseInputType {
  forInput: string;
  placeholder?: string;
  customStyle?: string;
  value?: string;
  'data-testid'?: string;
}

export interface TextareaType extends BaseInputType {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export interface SelectInputType extends BaseInputType {
  type: string;
  options: string[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => string[] | undefined;
  onSelect?: (e: MouseEvent<HTMLLIElement>) => void;
  customStyle?: string;
}

export interface InputType extends BaseInputType {
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
