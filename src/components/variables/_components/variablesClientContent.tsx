'use client';

import { VariablesList } from './variablesList';
import styles from '../variablesContent.module.scss';
import { VariablesHeader } from './variablesHeader';

export function VariablesClientContent() {
  return (
    <div className={styles.variablesContainer}>
      <VariablesHeader />
      <VariablesList />
    </div>
  );
}
