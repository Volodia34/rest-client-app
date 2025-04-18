'use client';
import GeneratedCode from './_components/GeneratedCode';
import RequestHeaders from './_components/RequestHeaders';
import './restClient.scss';
import RestBody from './_components/restBody/RestBody';
import HttpMethodURL from './_components/mainURL/HttpMethodURL';
import EncodePath from './_components/EncodePath';
import AuthLinks from '../links/AuthLinks';
import { useLanguageContext } from '@/context/LanguageContext';

const RestClient = () => {
  const { t } = useLanguageContext();
  return (
    <section className="container rest-client-wrapper">
      <AuthLinks restClient={true} />
      <EncodePath />
      <HttpMethodURL />
      <RequestHeaders />
      <RestBody />
      <GeneratedCode title={t('restClient.generatedCodeTitle') as string} />
    </section>
  );
};

export default RestClient;
