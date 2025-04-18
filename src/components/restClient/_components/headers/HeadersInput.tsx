import { headerKeys } from '@/constants/mockData';
import {
  setUpdateHeaderData,
  setUpdateHeaders,
} from '@/store/slices/headerSlice';
import { RootState } from '@/store/store';
import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddItem } from '@/hooks/useAddItem';

const HeadersInput = ({ id, index }: { id: number; index: number }) => {
  const dispatch = useDispatch();
  const headers = useSelector(
    (state: RootState) => state.headerSlice.variables
  );
  const [filterHeaderKeys, setFilterHeaderKeys] =
    useState<string[]>(headerKeys);

  const removeRow = () => {
    dispatch(setUpdateHeaders(id));
  };

  const filterOptions = (value: string) => {
    const filtered = headerKeys.filter((el) =>
      el.toUpperCase().includes(value.toUpperCase())
    );
    setFilterHeaderKeys(filtered);
    return filtered;
  };

  const {
    newKey,
    newValue,
    handleKeyChange,
    handleValueChange,
    handleKeySelect,
    handleAdd,
  } = useAddItem({
    onAdd: ({ key, value }) => {
      dispatch(setUpdateHeaderData({ data: { id, key, value }, index }));
    },
  });

  if (!headers[index]) {
    return null;
  }

  const currentHeader = headers[index];

  return (
    <div className="path-wrapper" id={`${id}`} data-testid="headers-inputs">
      <SelectInput
        data-testid="headers-key"
        value={currentHeader.key || newKey}
        forInput="headers-key"
        type="text"
        options={filterHeaderKeys}
        customStyle="widthMeth"
        onChange={(e) => handleKeyChange(e, filterOptions)}
        onSelect={handleKeySelect}
      />
      <Input
        onChange={handleValueChange}
        value={currentHeader.value || newValue}
        forInput="headers-value"
        type="text"
        customStyle="widthPath"
      />
      <Button className="button" text={'Add'} onClick={handleAdd} />
      <Button className="button" text={'Remove'} onClick={removeRow} />
    </div>
  );
};

export default HeadersInput;
