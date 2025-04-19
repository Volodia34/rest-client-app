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
import AuthLinks from '../links/AuthLinks';
import { useLanguageContext } from '@/context/LanguageContext';

interface Response {
  status: number;
  data: unknown;
}

const RestClient = () => {
  const { t } = useLanguageContext();
  const [response, setResponse] = useState<Response | null>(null);
  const { sendRequest } = useSendRequest();

  const handleSendRequest = async () => {
    const res = await sendRequest();
    setResponse(res);
  };

  return (
    <section className="container rest-client-wrapper">
      <AuthLinks restClient={true} />
      <EncodePath />
      <HttpMethodURL onSendRequest={handleSendRequest} />
      <RequestHeaders />
      <RestBody />
      <GeneratedCode title={t('restClient.generatedCodeTitle') as string} />
      <ResponseBlock response={response} />
    </section>
  );
};

export default RestClient;
