'use client';

import { VariablesList } from './variablesList';
import styles from '../variablesContent.module.scss';
import { VariablesHeader } from './variablesHeader';
import AuthLinks from '@/components/links/AuthLinks';

export function VariablesClientContent() {
  return (
    <div className={styles.variablesContainer}>
      <AuthLinks variables={true} />
      <VariablesHeader />
      <VariablesList />
    </div>
  );
}
