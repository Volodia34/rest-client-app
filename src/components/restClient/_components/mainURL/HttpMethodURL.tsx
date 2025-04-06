import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { methods } from '@/constants/mockData';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { MouseEvent } from 'react';
import { setMethod } from '@/store/slices/restSlice';

const HttpMethodURL = () => {
  const dispatch = useDispatch();
  const { method } = useSelector((state: RootState) => state.rest);
  const handleSelectMethod = (e: MouseEvent<HTMLElement>) => {
    dispatch(setMethod(e.currentTarget.id));
  };

  return (
    <div className="path-wrapper" data-testid="path-wrapper">
      <SelectInput
        data-test="select-methods"
        forInput="methods"
        type="text"
        options={methods}
        customStyle="widthMeth"
        value={method}
        onChange={() => console.log('2 onChange')}
        onSelect={handleSelectMethod}
      />
      <Input forInput="path" type="text" customStyle="widthPath" />
      <Button className="button" text={'Send'} onClick={() => {}} />
    </div>
  );
};

export default HttpMethodURL;
