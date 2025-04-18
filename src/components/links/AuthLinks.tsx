'use client';
import Link from 'next/link';
import { useLanguageContext } from '@/context/LanguageContext';
import './authLinks.scss';

interface AuthLinksProps {
  restClient?: boolean;
  historyPage?: boolean;
  variables?: boolean;
}

const AuthLinks = ({restClient=false, historyPage=false, variables=false}: AuthLinksProps) => {
  const { t } = useLanguageContext();

  return (
    <div className="auth-content">
      {!restClient && <Link className="link-page" href="/restClient">REST Client</Link>}
      {!historyPage && <Link className="link-page" href="/historyPage">{t('main.history') as string}</Link>}
      {!variables && <Link className="link-page" href="/variables">{t('main.variables') as string}</Link>}
    </div>
  );
};

export default AuthLinks;
