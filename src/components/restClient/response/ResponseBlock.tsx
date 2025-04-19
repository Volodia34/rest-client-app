import { useLanguageContext } from '@/context/LanguageContext';
import GeneratedCode from '../_components/GeneratedCode';

interface Response {
  status: number;
  data: unknown;
}

const ResponseBlock = ({ response }: { response: Response | null }) => {
  const { t } = useLanguageContext();
  if (!response) {
    return (
      <section className="container rest-client-wrapper">
        <p className="rest-title">Status: N/A</p>
        <GeneratedCode title={'Body:'} />
      </section>
    );
  }

  return (
    <section className="container rest-client-wrapper">
      <p className="rest-title">Status: {response.status}</p>
      <GeneratedCode title={t('restClient.generatedCodeBodyTitle') as string} />
      <p className="rest-response">
        {t('restClient.generatedResponse') as string}
      </p>
      <pre className="response-body">
        {JSON.stringify(response.data, null, 2)}
      </pre>
    </section>
  );
};

export default ResponseBlock;
