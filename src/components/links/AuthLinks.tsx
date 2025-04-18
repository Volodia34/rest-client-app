'use client';

import Link from 'next/link';
import { useLanguageContext } from '@/context/LanguageContext';
import './authLinks.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ModalSpinner from '../modalSpinner/ModalSpinner';

interface AuthLinksProps {
  restClient?: boolean;
  historyPage?: boolean;
  variables?: boolean;
}

const AuthLinks = ({
  restClient = false,
  historyPage = false,
  variables = false,
}: AuthLinksProps) => {
  const { t } = useLanguageContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setLoading(true);
    router.push(path);
  };

  return (
    <>
      <div className="auth-content">
        {!restClient && (
          <Link
            className="link-page"
            href="/restClient"
            onClick={(e) => handleNavigation(e, '/restClient')}
          >
            REST Client
          </Link>
        )}
        {!historyPage && (
          <Link
            className="link-page"
            href="/historyPage"
            onClick={(e) => handleNavigation(e, '/historyPage')}
          >
            {t('main.history') as string}
          </Link>
        )}
        {!variables && (
          <Link
            className="link-page"
            href="/variables"
            onClick={(e) => handleNavigation(e, '/variables')}
          >
            {t('main.variables') as string}
          </Link>
        )}
      </div>
      <ModalSpinner isOpen={loading} />
    </>
  );
};

export default AuthLinks;
