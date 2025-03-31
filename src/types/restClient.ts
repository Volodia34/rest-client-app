import { ReactNode } from "react";

export interface RequestSectionHeadProps {
  title: string;
  buttonText?: string;
  onClick?: () => void;
  children: ReactNode;
}

export interface GeneratedCodeType {
  title: string;
  code: string;
  buttonText?: string;
}
