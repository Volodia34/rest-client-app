'use client';

import { useState, useEffect } from 'react';
import { Variable } from '../../../types/variables';
import { EmptyState } from './emptyState';
import { VariablesHeader } from './variablesHeader';
import { VariablesList } from './variablesList';
import styles from '../variablesContent.module.scss';

const initialVariables: Variable[] = [
  { id: '1', key: 'API_URL', value: 'https://api.example.com' },
  { id: '2', key: 'AUTH_TOKEN', value: 'bearer_token_123' },
  { id: '3', key: 'USER_ID', value: 'user_12345' },
  { id: '4', key: 'ENVIRONMENT', value: 'development' },
];

export function VariablesClientContent() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedVariables = localStorage.getItem('variables');
    if (storedVariables) {
      setVariables(JSON.parse(storedVariables));
    } else {
      setVariables(initialVariables);
      localStorage.setItem('variables', JSON.stringify(initialVariables));
    }
    setIsLoaded(true);
  }, []);

  const getNextId = (vars: Variable[]): string => {
    if (vars.length === 0) return '1';
    const maxId = Math.max(...vars.map((v) => parseInt(v.id)));
    return (maxId + 1).toString();
  };

  const handleClearVariables = () => {
    setVariables([]);
    localStorage.setItem('variables', JSON.stringify([]));
  };

  const handleAddVariable = (newVariable: Variable) => {
    const nextId = getNextId(variables);
    const variableWithNewId = { ...newVariable, id: nextId };
    const updatedVariables = [...variables, variableWithNewId];
    setVariables(updatedVariables);
    localStorage.setItem('variables', JSON.stringify(updatedVariables));
  };

  const handleDeleteVariable = (id: string) => {
    const updatedVariables = variables.filter((variable) => variable.id !== id);
    setVariables(updatedVariables);
    localStorage.setItem('variables', JSON.stringify(updatedVariables));
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={styles.variablesContainer}>
      {variables.length > 0 ? (
        <>
          <VariablesHeader onClearVariables={handleClearVariables} />
          <VariablesList
            variables={variables}
            onAddVariable={handleAddVariable}
            onDeleteVariable={handleDeleteVariable}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
