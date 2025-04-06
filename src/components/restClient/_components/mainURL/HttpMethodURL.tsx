import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { methods } from '@/constants/mockData';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { setBaseUrl, setEndpoint, setMethod, setParams } from '@/store/slices/restSlice';

const HttpMethodURL = () => {
  const dispatch = useDispatch();
  const { method } = useSelector((state: RootState) => state.rest);
  const [filterMethods, setFilterMethods] = useState<string[]>(methods);
  const [render, setRender] = useState(false);

  const handleSelectMethod = (e: MouseEvent<HTMLElement>) => {
    dispatch(setMethod(e.currentTarget.id));
  };

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const rawUrl = e.target.value;
    const url = new URL(rawUrl);
    
    const baseUrl = `${url.protocol}//${url.host}${url.pathname.split('/').slice(0, 2).join('/')}`;
    const params = new URLSearchParams(url.search);

    params.forEach((value, key) => {
      const encodedValue = btoa(decodeURIComponent(value));
      params.set(key, encodedValue);
    });

    dispatch(setBaseUrl(baseUrl));
    dispatch(setParams(params.toString()));
    dispatch(setEndpoint(rawUrl.replace(baseUrl, '')));
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
    setRender(!render)
  }, [method])

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
      <Input forInput="path" type="text" customStyle="widthPath" onChange={handleUrl} />
      <Button className="button" text={'Send'} onClick={() => {}} />
    </div>
  );
};

export default HttpMethodURL;
