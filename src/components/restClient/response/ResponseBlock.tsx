import { useLanguageContext } from '@/context/LanguageContext';
import GeneratedCode from '../_components/GeneratedCode';

interface Response {
  status: number;
  data: unknown;
}

const ResponseBlock = ({ response }: { response: Response | null }) => {
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
      <pre className="response-body">
        {JSON.stringify(response.data, null, 2)}
      </pre>
    </section>
  );
};

export default ResponseBlock;
