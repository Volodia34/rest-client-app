'use client';
import Link from 'next/link';
import { useLanguageContext } from '@/context/LanguageContext';

const AuthLinks = () => {
  const { t } = useLanguageContext();

  return (
    <div className="auth-content">
      <Link href="/restClient">REST Client</Link>
      <Link href="/historyPage">{t('main.history') as string}</Link>
      <Link href="/variables">{t('main.variables') as string}</Link>
    </div>
  );
};

export default AuthLinks;
