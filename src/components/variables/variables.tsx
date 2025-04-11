import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { VariablesClientContent } from './_components/variablesClientContent';

const Variables = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  if (!user) {
    redirect('/');
  }

  return <VariablesClientContent />;
};

export default Variables;
