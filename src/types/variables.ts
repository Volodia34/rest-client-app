export interface Variable {
  id: string;
  key: string;
  value: string;
}

export interface VariablesListProps {
  variables: Variable[];
  onAddVariable: (variable: Variable) => void;
  onDeleteVariable: (id: string) => void;
}

export interface VariablesHeaderProps {
  onClearVariables: () => void;
}
