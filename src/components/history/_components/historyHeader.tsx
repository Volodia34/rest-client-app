import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../historyContent.module.scss';

import { HistoryHeaderProps } from '@/types/history';
export const HistoryHeader = ({ onClearHistory }: HistoryHeaderProps) => {
  const { t } = useLanguageContext();

  return (
    <>
      <h2 className={styles.historyTitle}>{t('history.title') as string}</h2>
      <div className={styles.headerActions}>
        <Button
          className={styles.clearHistoryButton}
          text={t('history.clearHistory') as string}
          onClick={onClearHistory}
        />
      </div>
    </>
  );
};
