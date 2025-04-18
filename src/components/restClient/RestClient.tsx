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
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';

interface Response {
  status: number;
  data: unknown;
}

const RestClient = () => {
  const { user, loading } = useAuth();
  const [response, setResponse] = useState<Response | null>(null);
  const { sendRequest } = useSendRequest();

  if (loading) {
    return null;
  }

  if (!user) {
    redirect('/');
    return null;
  }

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
