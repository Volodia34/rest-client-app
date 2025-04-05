'use client';

import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import styles from './historyContent.module.scss';
import { HistoryItem } from '@/types/history';

export default function HistoryContent() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem('requestHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });

  const { user, loading } = useAuth();
  const router = useRouter();
  const { t } = useLanguageContext();

  if (!loading && !user) {
    redirect('/main');
  }

  return (
    <div className={styles.historyContainer}>
      {history.length > 0 ? (
        <>
          <div className={styles.headerActions}>
            <Button
              className={styles.clearHistoryButton}
              text={t('history.clearHistory') as string}
              onClick={() => {
                setHistory([]);
                localStorage.setItem('requestHistory', JSON.stringify([]));
              }}
            />
          </div>
          <div className={styles.historyList}>
            {history.map((item, index) => (
              <div key={index} className={styles.historyItem}>
                <span className={styles.method}>{item.method}</span>
                <span className={styles.url}>{item.url}</span>
                <span className={styles.timestamp}>{item.timestamp}</span>
                <span className={styles.status}>{item.status}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
}
