export interface Variable {
  [key: string]: string;
}

export interface VariablesListProps {
  variables: Variable;
  onAddVariable: (variable: Variable) => void;
  onDeleteVariable: (id: string) => void;
}

export interface VariablesHeaderProps {
  onClearVariables: () => void;
}
