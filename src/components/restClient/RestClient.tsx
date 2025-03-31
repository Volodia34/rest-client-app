'use client';

import Button from '@/UI/buttons/Button';
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
    <section className="container rest-client-wrapper">
      <div className="path-wrapper">
        <SelectInput
          forInput="methods"
          type="text"
          options={methods}
          customStyle="widthMeth"
          value="GET"
        />
        <Input forInput="path" type="text" customStyle="widthPath" />
        <Button
          className="button"
          text={'Send'}
          onClick={() => {}}
        />
      </div>
      <RequestHeaders />
      <GeneratedCode title={"Generated request code:"} code={`<section className="container rest-client-wrapper">`} buttonText="Generate" />
      <RequestSection title="Body:">
        <Textarea forInput="body-json" />
      </RequestSection>
    </section>
  );
};

export default RestClient;
