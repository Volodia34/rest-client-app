import Input from '@/UI/inputs/Input';
import SelectInput from '@/UI/inputs/SelectInput';
import RequestSection from './RequestSection';
import Button from '@/UI/buttons/Button';
import { headerKeys } from '@/constants/mockData';

const RequestHeaders = () => {
  return (
    <RequestSection title="Headers:" buttonText="Add Header">
      <div className="path-wrapper">
        <SelectInput
          forInput="headers-key"
          type="text"
          options={headerKeys}
          customStyle="widthMeth"
        />
        <Input forInput="headers-value" type="text" customStyle="widthPath" />
        <Button className="button" text={'Remove'} onClick={() => {}} />
      </div>
    </RequestSection>
  );
};

export default RequestHeaders;
