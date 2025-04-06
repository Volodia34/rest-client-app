import { useRouter } from 'next/navigation';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../historyContent.module.scss';

export const EmptyState = () => {
  const router = useRouter();
  const { t } = useLanguageContext();

  return (
    <div className={styles.emptyState}>
      <h2>{t('history.empty') as string}</h2>
      <p>{t('history.tryOptions') as string}</p>
      <div className={styles.actions}>
        <Button
          className={styles.goToClientButton}
          text={t('history.goToClient') as string}
          onClick={() => router.push('/restClient')}
        />
      </div>
    </div>
  );
};
