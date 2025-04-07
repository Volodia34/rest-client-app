import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { methods } from '@/constants/mockData';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import {
  setBaseUrl,
  setEndpoint,
  setMethod,
  setParamsAndEncode,
  setUrlValueInput,
} from '@/store/slices/restSlice';
import { encodeBase64 } from '@/helpers/encodeBase64';

const HttpMethodURL = () => {
  const dispatch = useDispatch();
  const { method, urlValueInput } = useSelector(
    (state: RootState) => state.rest
  );
  const [filterMethods, setFilterMethods] = useState<string[]>(methods);
  const [render, setRender] = useState(false);

  const handleSelectMethod = (e: MouseEvent<HTMLElement>) => {
    dispatch(setMethod(e.currentTarget.id));
  };

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrlValueInput(e.target.value));
    const rawUrl = e.target.value;
    const url = new URL(rawUrl);

    dispatch(setBaseUrl(`${url.protocol}//${url.host}`));
    dispatch(setEndpoint(url.pathname));

    const params = new URLSearchParams(url.search);

    // params.forEach((value, key) => {
    //   const cleanValue = value.replace(/^'+|'+$/g, '')
    //   const encodedValue = encodeBase64(cleanValue);
    //   params.set(key, encodedValue);
    // });

    dispatch(
      setParamsAndEncode({
        params: params.toString(),
      })
    );
  };

  const handleChangeMethod = (e: ChangeEvent<HTMLInputElement>) => {
    const methodSelect = e.target.value.toUpperCase();
    const filtered = methods.filter((el) => el.includes(methodSelect));
    setFilterMethods(filtered);
    if (methods.includes(methodSelect)) {
      dispatch(setMethod(methodSelect));
    }
  };

  useEffect(() => {
    setRender(!render);
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
