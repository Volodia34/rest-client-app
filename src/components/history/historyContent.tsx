import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { HistoryClientContent } from './_components/historyClientContent';

export default function HistoryContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  if (!user) {
    redirect('/');
  }

  return <HistoryClientContent />;
}
