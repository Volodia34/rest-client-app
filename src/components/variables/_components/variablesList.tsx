'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';
import Input from '@/UI/inputs/Input';
import Button from '@/UI/buttons/Button';
import styles from '../variablesContent.module.scss';
import { useVariable } from '@/hooks/useVariable';
import { EmptyState } from './emptyState';

export const VariablesList = () => {
  const { t } = useLanguageContext();
  const [variableKeys, setVariableKeys] = useState<string[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  
  const { setVariable, removeVariables, variables } = useVariable();

  const handleAddVariable = () => {
    if (newKey.trim() && newValue.trim()) {
      setVariable(newKey.trim(), newValue.trim());
      setNewKey('');
      setNewValue('');
    }
  };

  useEffect(() => {
    if (variables) setVariableKeys(Object.keys(variables))
  }, [variables])

  return (
    <div className={styles.variablesList}>
      <div className={styles.variablesHeader}>
        <span>{t('variables.key') as string}</span>
        <span>{t('variables.value') as string}</span>
        <span></span>
      </div>
      {variableKeys.map((key) => (
        <div key={key} className={styles.variableItem}>
          <span className={styles.key}>{key}</span>
          <span className={styles.value}>{variables[key]}</span>
          <Button
            className={styles.deleteButton}
            onClick={() => removeVariables(key)}
            text={t('variables.delete') as string}
          />
        </div>
      ))}
      {!variableKeys.length && <EmptyState />}
      <div className={styles.addVariable}>
        <Input
          type="text"
          value={newKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewKey(e.target.value)
          }
          placeholder={t('variables.enterKey') as string}
          forInput="value"
        />
        <Input
          type="text"
          value={newValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewValue(e.target.value)
          }
          placeholder={t('variables.enterValue') as string}
          forInput="value"
        />
        <Button
          className={styles.addButton}
          onClick={handleAddVariable}
          text={t('variables.add') as string}
        />
      </div>
    </div>
  );
};
