'use client';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import Link from 'next/link';
import './main.scss';

const MainPage = () => {
  const { t } = useLanguageContext();
  const isAuth = false;
  return (
    <div className="container main-page-wrapper">
      <h1>{t('main.welcome') as string}</h1>
      <div className="main-page-content">
        {!isAuth ? (
          <>
            <Button
              className="login-button"
              text={t('header.login') as string}
              onClick={() => alert('Login clicked')}
            />
            <Button
              className="sign-up-button"
              text={t('header.signup') as string}
              onClick={() => alert('Sign Up clicked')}
            />
          </>
        ) : (
          <div className="auth-content">
            <Link href="/restClient">REST Client</Link>
            <Link href="/history">History</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
