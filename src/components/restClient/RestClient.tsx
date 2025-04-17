'use client';

import { useState } from 'react';
import GeneratedCode from './_components/GeneratedCode';
import RequestHeaders from './_components/RequestHeaders';
import './restClient.scss';
import RestBody from './_components/restBody/RestBody';
import HttpMethodURL from './_components/mainURL/HttpMethodURL';
import EncodePath from './_components/EncodePath';
import ResponseBlock from './response/ResponseBlock';
import { useSendRequest } from '@/hooks/useSendRequest';

interface Response {
  status: number;
  data: unknown;
}

const RestClient = () => {
  const [response, setResponse] = useState<Response | null>(null);
  const { sendRequest } = useSendRequest();

  const handleSendRequest = async () => {
    const res = await sendRequest();
    setResponse(res);
  };

  return (
    <section className="container rest-client-wrapper">
      <EncodePath />
      <HttpMethodURL onSendRequest={handleSendRequest} />
      <RequestHeaders />
      <RestBody />
      <GeneratedCode title={'Generated request code:'} />
      <ResponseBlock response={response} />
    </section>
  );
};

export default RestClient;
