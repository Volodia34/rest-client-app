'use client';
import GeneratedCode from './_components/GeneratedCode';
import RequestHeaders from './_components/RequestHeaders';
import './restClient.scss';
import RestBody from './_components/restBody/RestBody';
import HttpMethodURL from './_components/mainURL/HttpMethodURL';
import EncodePath from './_components/EncodePath';
import AuthLinks from '../links/AuthLinks';
import { useLanguageContext } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import ModalSpinner from '../modalSpinner/ModalSpinner';

const RestClient = () => {
  const { t } = useLanguageContext();
  const { loading } = useAuth();

  if (loading) {
    <ModalSpinner isOpen={loading} />
  }

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
