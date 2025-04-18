'use client';
import GeneratedCode from './_components/GeneratedCode';
import RequestHeaders from './_components/RequestHeaders';
import './restClient.scss';
import RestBody from './_components/restBody/RestBody';
import HttpMethodURL from './_components/mainURL/HttpMethodURL';
import EncodePath from './_components/EncodePath';
import AuthLinks from '../links/AuthLinks';

const RestClient = () => {
  return (
    <section className="container rest-client-wrapper">
      <AuthLinks restClient={true} />
      <EncodePath />
      <HttpMethodURL />
      <RequestHeaders />
      <RestBody />
      <GeneratedCode title={'Generated request code:'} />
    </section>
  );
};

export default RestClient;
