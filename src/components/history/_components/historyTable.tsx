import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../historyContent.module.scss';
import { HistoryTableProps, HistoryItem } from '@/types/history';
import { useRouterSafe } from '@/hooks/useRouterSafe';

export const HistoryTable = ({ history }: HistoryTableProps) => {
  const { t } = useLanguageContext();
  const router = useRouterSafe();

  const handleUrlClick = (url: string) => {
    if (!router) return;
    if (typeof window === 'undefined') return;

    const history = JSON.parse(localStorage.getItem('requestHistory') || '[]');
    const selectedRequest = history.find(
      (item: HistoryItem) => item.url === url
    );

    if (selectedRequest) {
      const headers = Object.entries(selectedRequest.headers).map(
        ([key, value], id) => ({
          id,
          key,
          value,
        })
      );
      const headersParam = encodeURIComponent(JSON.stringify(headers));

      router.push(
        `/restClient?url=${encodeURIComponent(selectedRequest.url)}&method=${selectedRequest.method}&headers=${headersParam}`
      );
    }
  };

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
              onClick={() => handleUrlClick(item.url)}
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
