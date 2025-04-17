import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { methods } from '@/constants/mockData';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { setMethod } from '@/store/slices/bodySlice';
import {
  setBaseUrl,
  setEndpoint,
  setParamsAndEncode,
  setUrlValueInput,
} from '@/store/slices/urlSlice';
import { isVariables, replaceVariables } from '@/helpers/replaceVariables';
import { useVariable } from '@/hooks/useVariable';

const HttpMethodURL = () => {
  const dispatch = useDispatch();
  const { urlValueInput } = useSelector((state: RootState) => state.urlSlice);
  const { method } = useSelector((state: RootState) => state.bodySlice);
  const [filterMethods, setFilterMethods] = useState<string[]>(methods);
  const [render, setRender] = useState(false);

  const { variables } = useVariable();

  const handleSelectMethod = (e: MouseEvent<HTMLElement>) => {
    dispatch(setMethod(e.currentTarget.id));
  };

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    let rawUrl = e.target.value;
    if (isVariables(rawUrl)) {
      rawUrl = replaceVariables(rawUrl, variables)
    }
    dispatch(setUrlValueInput(rawUrl));
    const url = new URL(rawUrl);

    dispatch(setBaseUrl(`${url.protocol}//${url.host}`));
    dispatch(setEndpoint(url.pathname));

    const params = new URLSearchParams(url.search);

    dispatch(
      setParamsAndEncode({
        params: params.toString(),
      })
    );
  };

  const handleChangeMethod = (e: ChangeEvent<HTMLInputElement>): string[] => {
    const methodSelect = e.target.value.toUpperCase();
    const filtered = methods.filter((el) => el.includes(methodSelect));
    setFilterMethods(filtered);
    if (methods.includes(methodSelect)) {
      dispatch(setMethod(methodSelect));
    }
    return filtered;
  };

  useEffect(() => {
    setRender((prev) => !prev);
  }, [method]);

  return (
    <div key={`${render}`} className="path-wrapper" data-testid="path-wrapper">
      <SelectInput
        data-test="select-methods"
        forInput="methods"
        type="text"
        options={filterMethods}
        customStyle="widthMeth"
        value={method}
        onChange={handleChangeMethod}
        onSelect={handleSelectMethod}
      />
      <Input
        forInput="path"
        type="text"
        value={urlValueInput}
        customStyle="widthPath"
        onChange={handleUrl}
      />
      <Button className="button" text={'Send'} onClick={() => {}} />
    </div>
  );
};

export default HttpMethodURL;
