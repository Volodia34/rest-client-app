import { useRouter } from 'next/navigation';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../variablesContent.module.scss';
import { useState } from 'react';
import ModalSpinner from '@/components/modalSpinner/ModalSpinner';

export const EmptyState = () => {
  const router = useRouter();
  const { t } = useLanguageContext();
  const [loading, setLoading] = useState(false);

  const handleRestClient = () => {
    setLoading(true);
    router.push('/restClient')
  }

  return (
    <div className={styles.emptyState}>
      <h2>{t('variables.empty') as string}</h2>
      <p>{t('variables.tryOptions') as string}</p>
      <div className={styles.actions}>
        <Button
          className={styles.goToClientButton}
          text={t('variables.goToClient') as string}
          onClick={handleRestClient}
        />
      </div>
      <ModalSpinner isOpen={loading} />
    </div>
  );
};
