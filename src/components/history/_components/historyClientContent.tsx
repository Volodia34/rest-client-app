'use client';

import { useState, useEffect } from 'react';
import { HistoryItem } from '@/types/history';
import { EmptyState } from './emptyState';
import { HistoryHeader } from './historyHeader';
import { HistoryTable } from './historyTable';
import styles from '../historyContent.module.scss';

export function HistoryClientContent() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem('requestHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory).sort(
        (a: HistoryItem, b: HistoryItem): number =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setHistory(parsedHistory);
    }
    setIsLoaded(true);
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.setItem('requestHistory', JSON.stringify([]));
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={styles.historyContainer}>
      {history.length > 0 ? (
        <>
          <HistoryHeader onClearHistory={handleClearHistory} />
          <HistoryTable history={history} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
