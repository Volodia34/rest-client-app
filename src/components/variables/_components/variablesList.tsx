'use client';

import { useState, ChangeEvent } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';
import Input from '@/UI/inputs/Input';
import Button from '@/UI/buttons/Button';
import { Variable, VariablesListProps } from '../../../types/variables';
import styles from '../variablesContent.module.scss';

export const VariablesList = ({
  variables,
  onAddVariable,
  onDeleteVariable,
}: VariablesListProps) => {
  const { t } = useLanguageContext();
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddVariable = () => {
    if (newKey.trim() && newValue.trim()) {
      const newId = (variables.length + 1).toString();
      onAddVariable({ id: newId, key: newKey.trim(), value: newValue.trim() });
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <div className={styles.variablesList}>
      <div className={styles.variablesHeader}>
        <span>{t('variables.key') as string}</span>
        <span>{t('variables.value') as string}</span>
        <span></span>
      </div>
      {variables.map((variable: Variable) => (
        <div key={variable.id} className={styles.variableItem}>
          <span className={styles.key}>{variable.key}</span>
          <span className={styles.value}>{variable.value}</span>
          <Button
            className={styles.deleteButton}
            onClick={() => onDeleteVariable(variable.id)}
            text={t('variables.delete') as string}
          />
        </div>
      ))}
      <div className={styles.addVariable}>
        <Input
          type="text"
          value={newKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewKey(e.target.value)
          }
          placeholder={t('variables.enterKey') as string}
          forInput="key"
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
