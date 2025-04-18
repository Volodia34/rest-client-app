import { ChangeEvent, MouseEvent, useState } from 'react';

interface UseAddItemProps {
  onAdd: (data: { key: string; value: string }) => void;
  createItem?: (key: string, value: string) => void;
  initialKey?: string;
  initialValue?: string;
}

export const useAddItem = ({
  onAdd,
  createItem,
  initialKey = '',
  initialValue = '',
}: UseAddItemProps) => {
  const [newKey, setNewKey] = useState(initialKey);
  const [newValue, setNewValue] = useState(initialValue);

  const handleKeyChange = (
    e: ChangeEvent<HTMLInputElement>,
    filterOptions?: (value: string) => string[]
  ) => {
    const value = e.target.value;
    setNewKey(value);
    return filterOptions?.(value);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const handleKeySelect = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id) {
      setNewKey(e.currentTarget.id);
      return true;
    }
    return false;
  };

  const handleAdd = () => {
    const trimmedKey = newKey.trim();
    const trimmedValue = newValue.trim();

    if (!trimmedKey || !trimmedValue) return;

    onAdd({ key: trimmedKey, value: trimmedValue });
    if (!initialKey && !initialValue) {
      setNewKey('');
      setNewValue('');
    }
    if (createItem) {
      createItem(trimmedKey, trimmedValue);
    }
  };

  return {
    newKey,
    newValue,
    handleKeyChange,
    handleValueChange,
    handleKeySelect,
    handleAdd,
    setNewKey,
    setNewValue,
  };
};
