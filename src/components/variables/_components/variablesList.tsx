'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import Button from '@/UI/buttons/Button';
import { Variable, VariablesListProps } from '../../../types/variables';
import styles from '../variablesContent.module.scss';
import { headerKeys } from '@/constants/mockData';

export const VariablesList = ({
  variables,
  onAddVariable,
  onDeleteVariable,
}: VariablesListProps) => {
  const { t } = useLanguageContext();
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [filteredKeys, setFilteredKeys] = useState<string[]>(headerKeys);

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filtered = headerKeys.filter((key) =>
      key.toUpperCase().includes(inputValue.toUpperCase())
    );
    setFilteredKeys(filtered);
    setNewKey(inputValue);
  };

  const handleKeySelect = (e: MouseEvent<HTMLElement>) => {
    const selectedId = e.currentTarget.id;
    if (selectedId) {
      setNewKey(selectedId);
      setFilteredKeys(headerKeys);
    }
  };

  const handleAddVariable = () => {
    if (newKey.trim() && newValue.trim()) {
      onAddVariable({ id: '', key: newKey.trim(), value: newValue.trim() });
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
        <SelectInput
          type="text"
          value={newKey}
          onChange={handleKeyChange}
          onSelect={handleKeySelect}
          options={filteredKeys}
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
