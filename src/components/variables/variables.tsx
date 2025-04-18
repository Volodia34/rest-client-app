import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { VariablesClientContent } from './_components/variablesClientContent';
import ModalSpinner from '../modalSpinner/ModalSpinner';

export default function Variables() {
  const { user, loading } = useAuth();

  if (loading) {
    <ModalSpinner isOpen={loading} />
  }

  if (!user) {
    redirect('/');
  }

  return <VariablesClientContent />;
}
