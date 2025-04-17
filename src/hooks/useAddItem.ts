import { HeaderRest } from '@/types/restClient';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

interface UseAddItemProps {
  onAdd: (data: { key: string; value: string }) => void;
  createItem?: (key: string, value: string) => void;
  initialKey?: string;
  initialValue?: string;
  headers: HeaderRest[]
  index: number
}

export const useAddItem = ({
  onAdd,
  createItem,
  initialKey = '',
  initialValue = '',
  headers,
  index,
}: UseAddItemProps) => {
  const [newKey, setNewKey] = useState(initialKey);
  const [newValue, setNewValue] = useState(initialValue);

  const handleKeyChange = (
    e: string,
    filterOptions?: (value: string) => string[]
  ) => {
    setNewKey(e);
    return filterOptions?.(e);
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
    if (createItem) {
      createItem(trimmedKey, trimmedValue);
    }
  };

  useEffect(() => {
    if (headers[index]) {
      setNewKey(headers[index].key)
      setNewValue(headers[index].value)
    }
  }, [])

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
