import { useLanguageContext } from '@/context/LanguageContext';
import GeneratedCode from '../_components/GeneratedCode';

const ResponseBlock = () => {
  const { t } = useLanguageContext();
  return (
    <section className="container rest-client-wrapper">
      <p className="rest-title">
        {t('restClient.generatedCodeRestTitle') as string}{' '}
        {t('restClient.generatedCodeRestCode') as string}
      </p>
      <GeneratedCode title={t('restClient.generatedCodeBodyTitle') as string} />
    </section>
  );
};

export default ResponseBlock;
