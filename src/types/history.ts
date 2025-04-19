export interface HistoryItem {
  method: string;
  url: string;
  timestamp: string;
  status?: number;
  headers: Record<string, string>;
}
export interface HistoryHeaderProps {
  onClearHistory: () => void;
}
export interface HistoryTableProps {
  history: HistoryItem[];
}
