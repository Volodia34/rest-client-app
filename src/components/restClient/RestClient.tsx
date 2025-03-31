'use client';

import Input from '../../UI/inputs/Input';
import SelectInput from '../../UI/inputs/SelectInput';
import Textarea from '../../UI/inputs/Textarea';
import GeneratedCode from './_components/GeneratedCode';
import RequestHeaders from './_components/RequestHeaders';
import RequestSection from './_components/RequestSection';
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
      <RequestHeaders />
      <GeneratedCode />
      <RequestSection title="Body:">
        <Textarea forInput="body-json" />
      </RequestSection>
    </section>
  );
};

export default RestClient;
