import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { VariablesClientContent } from './_components/variablesClientContent';

export default function Variables() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    redirect('/');
  }

  return <VariablesClientContent />;
}
