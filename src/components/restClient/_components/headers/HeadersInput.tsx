import { headerKeys } from '@/constants/mockData';
import { setHeaderData, setUpdateHeaders } from '@/store/slices/restSlice';
import { RootState } from '@/store/store';
import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HeadersInput = ({ id, index }: { id: number; index: number }) => {
  const dispatch = useDispatch();
  const headers = useSelector((state: RootState) => state.rest.headers);
  const [render, setRender] = useState(false);
  const [filterHeaderKeys, setFilterHeaderKeys] =
    useState<string[]>(headerKeys);
  const [dataHeaders, setDataHeaders] = useState(
    headers[index] || { id, key: '', value: '' }
  );

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const headerKeySelect = e.target.value.toUpperCase();
    const filtered = headerKeys.filter((el) =>
      el.toUpperCase().includes(headerKeySelect)
    );
    setFilterHeaderKeys(filtered);
    if (headerKeys.includes(headerKeySelect)) {
      setDataHeaders({ ...dataHeaders, key: headerKeySelect });
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataHeaders({ ...dataHeaders, value: e.target.value });
  };

  const handleSetChange = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id) {
      setDataHeaders({ ...dataHeaders, key: e.currentTarget.id });
      setRender(!render);
    }
  };

  const removeRow = () => {
    dispatch(setUpdateHeaders(id));
    setDataHeaders({ id, key: '', value: '' });
  };

  const handleAdd = () => {
    dispatch(
      setHeaderData({
        data: { id, key: dataHeaders.key, value: dataHeaders.value },
        index,
      })
    );
  };

  useEffect(() => {
    setRender(!render);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers[index]?.key]);

  if (!headers[index]) {
    return null;
  }

  return (
    <div
      key={`${render}`}
      className="path-wrapper"
      id={`${id}`}
      data-testid="headers-inputs"
    >
      <SelectInput
        data-testid="headers-key"
        value={dataHeaders.key}
        forInput="headers-key"
        type="text"
        options={filterHeaderKeys}
        customStyle="widthMeth"
        onChange={handleKeyChange}
        onSelect={handleSetChange}
      />
      <Input
        onChange={handleValueChange}
        value={dataHeaders.value}
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
