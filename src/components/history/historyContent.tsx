'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './historyContent.module.scss';
import { HistoryItem } from '@/types/history';
import { EmptyState } from './_components/emptyState';
import { HistoryHeader } from './_components/historyHeader';
import { HistoryTable } from './_components/historyTable';

export default function HistoryContent() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedHistory: string | null =
        localStorage.getItem('requestHistory');
      const parsedHistory: HistoryItem[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];
      return parsedHistory.sort(
        (a: HistoryItem, b: HistoryItem): number =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
    return [];
  });

  const { user, loading } = useAuth();

  if (!loading && !user) {
    redirect('/main');
  }

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.setItem('requestHistory', JSON.stringify([]));
  };

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
