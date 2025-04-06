import Button from '@/UI/buttons/Button';
import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import { methods } from '@/constants/mockData';

const HttpMethodURL = () => {
  return (
    <div className="path-wrapper" data-testid="path-wrapper">
      <SelectInput
        data-test="select-methods"
        forInput="methods"
        type="text"
        options={methods}
        customStyle="widthMeth"
        value="GET"
        onChange={() => {}}
        onSelect={() => {}}
      />
      <Input forInput="path" type="text" customStyle="widthPath" />
      <Button className="button" text={'Send'} onClick={() => {}} />
    </div>
  );
};

export default HttpMethodURL;
