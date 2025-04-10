import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../historyContent.module.scss';
import { HistoryTableProps } from '@/types/history';

export const HistoryTable = ({ history }: HistoryTableProps) => {
  const { t } = useLanguageContext();

  return (
    <>
      <div className={styles.tableHeader}>
        <span>{t('history.method') as string}</span>
        <span>{t('history.url') as string}</span>
        <span>{t('history.time') as string}</span>
        <span>{t('history.status') as string}</span>
      </div>
      <div className={styles.historyList}>
        {history.map((item, index) => (
          <div key={index} className={styles.historyItem}>
            <span className={styles.method} data-method={item.method}>
              {item.method}
            </span>
            <span
              className={styles.url}
              onClick={() => alert(item.url + 'Нажат')}
            >
              {item.url}
            </span>
            <span className={styles.timestamp}>{item.timestamp}</span>
            <span className={styles.status}>{item.status}</span>
          </div>
        ))}
      </div>
    </>
  );
};
