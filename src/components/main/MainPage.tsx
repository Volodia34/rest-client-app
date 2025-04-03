'use client';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import './main.scss';

const MainPage = () => {
  const { t } = useLanguageContext();
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="container main-page-wrapper">
      {!user ? (
        <>
          <h1>{t('main.welcome') as string}</h1>
          <div className="main-page-content">
            <Button
              className="login-button"
              text={t('header.login') as string}
              onClick={() => router.push('/signin')}
            />
            <Button
              className="sign-up-button"
              text={t('header.signup') as string}
              onClick={() => router.push('/signup')}
            />
          </div>
        </>
      ) : (
        <>
          <div className="main-page-content-auth">
            <h1>
              {(t('main.welcomeBack') as string).replace(
                '%username%',
                user.displayName ?? 'Guest'
              )}
            </h1>
            <div className="auth-content">
              <Link href="/restClient">REST Client</Link>
              <Link href="/history">{t('main.history') as string}</Link>
              <Link href="/variables">{t('main.variables') as string}</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
