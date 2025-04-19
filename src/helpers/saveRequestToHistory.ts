import { HistoryItem } from '@/types/history';

export const saveRequestToHistory = (
  method: string,
  url: string,
  headers: Record<string, string>,
  status: number
): void => {
  const history = JSON.parse(localStorage.getItem('requestHistory') || '[]');
  const newEntry: HistoryItem = {
    method,
    url,
    headers,
    timestamp: new Date().toLocaleString(),
    status,
  };
  localStorage.setItem(
    'requestHistory',
    JSON.stringify([...history, newEntry])
  );
};
