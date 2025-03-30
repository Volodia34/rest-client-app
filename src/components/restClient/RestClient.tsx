'use client';

import Input from '../ui/inputs/Input';
import SelectInput from '../ui/inputs/SelectInput';
import './restClient.scss';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const RestClient = () => {
  return (
    <section className="container">
      <div className="path-wrapper">
        <SelectInput
          forInput="methods"
          type="text"
          options={methods}
          customStyle="widthMeth"
          value="GET"
        />
        <Input forInput="path" type="text" customStyle="widthPath" />
        <button className="button">Send</button>
      </div>
    </section>
  );
};

export default RestClient;
