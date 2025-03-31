export interface TextareaType {
  forInput: string;
  placeholder?: string;
  customStyle?: string;
}

export interface SelectInputType extends TextareaType {
  type: string;
  options: string[];
  value?: string;
}

export interface InputType extends TextareaType {
  type: string;
  value?: string;
}