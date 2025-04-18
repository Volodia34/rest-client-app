'use client';
import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import './main.scss';
import AuthLinks from '../links/AuthLinks';
import ModalSpinner from '../modalSpinner/ModalSpinner';
import { useState } from 'react';

const MainPage = () => {
  const { t } = useLanguageContext();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loadingModal, setLoadingModal] = useState(false);

  const handleModal = () => {
    setTimeout(() => {
      setLoadingModal(false)
    }, 600)
  }

  const handleSignup = () => {
    setLoadingModal(true)
    setTimeout(() => router.push('/signup'), 400)
    handleModal()
  }

  const handleSignin = () => {
    setLoadingModal(true)
    setTimeout(() => router.push('/signin'), 400)
    handleModal()
  }

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
                  onClick={handleSignin}
                />
                <Button
                  className="sign-up-button"
                  text={t('header.signup') as string}
                  onClick={handleSignup}
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
      {loading && <ModalSpinner isOpen={loading} />}
      {loadingModal && <ModalSpinner isOpen={loadingModal} />}      
    </div>
  );
};

export default MainPage;
