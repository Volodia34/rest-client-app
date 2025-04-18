import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { HistoryClientContent } from './_components/historyClientContent';
import ModalSpinner from '../modalSpinner/ModalSpinner';

export default function HistoryContent() {
  const { user, loading } = useAuth();

  if (loading) {
    <ModalSpinner isOpen={loading} />
  }
  if (!user) {
    redirect('/');
  }

  return <HistoryClientContent />;
}
