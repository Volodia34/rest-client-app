'use client';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import './main.scss';
import AuthLinks from '../links/AuthLinks';

const MainPage = () => {
  const { t } = useLanguageContext();
  const { user, loading } = useAuth();
  const router = useRouter();
  return (
    <div className="container main-page-wrapper">
      {!loading && (
        <>
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
                <AuthLinks />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MainPage;
