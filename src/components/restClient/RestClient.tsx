'use client';

import Button from '@/UI/buttons/Button';
import Input from '../../UI/inputs/Input';
import SelectInput from '../../UI/inputs/SelectInput';
import GeneratedCode from './_components/GeneratedCode';
import RequestHeaders from './_components/RequestHeaders';
import './restClient.scss';
import { methods } from '@/constants/mockData';
import RestBody from './_components/restBody/RestBody';

const RestClient = () => {
  return (
    <section className="container rest-client-wrapper">
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
      <RequestHeaders />
      <GeneratedCode
        title={'Generated request code:'}
        code={`<section className="container rest-client-wrapper">`}
        buttonText="Generate"
      />
      <RestBody />
    </section>
  );
};

export default RestClient;
