'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Button from '@/UI/buttons/Button';
import Image from 'next/image';
import './header.scss';
import { useEffect, useState } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';
import Link from 'next/link';
import ModalSpinner from '../modalSpinner/ModalSpinner';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { currentLang, toggleLanguage, t } = useLanguageContext();
  const { user, logout, loading } = useAuth();
  const [loadingModal, setLoadingModal] = useState(false);
  const router = useRouter();

  const handleModal = () => {
    setTimeout(() => {
      setLoadingModal(false)
    }, 600)
  }

  const handleMainpage = () => {
    setLoadingModal(true)
    setTimeout(() => router.push('/'), 400)
    handleModal()
  }

  const handleLogout = () => {
    setLoadingModal(true)
    setTimeout(() => logout(), 400)
    handleModal()
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

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`container header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div className="app-header">
        <div className="logo">
          <Link href="/">
            <Image priority src="/logo.png" alt="Logo" width={80} height={80} />
          </Link>
        </div>
        <div className="header-controls">
          <Button
            className="language-button"
            text={currentLang}
            onClick={toggleLanguage}
          />
          {!loading && (
            <>
              {!user ? (
                <>
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
                </>
              ) : (
                <>
                  <Button
                    className="main-page-button"
                    text={t('header.mainpage') as string}
                    onClick={handleMainpage}
                  />
                  <Button
                    className="logout-button"
                    text={t('header.logout') as string}
                    onClick={handleLogout}
                  />
                </>
              )}
            </>
          )}
          {loadingModal && <ModalSpinner isOpen={loadingModal} />}
          {loading && <ModalSpinner isOpen={loading} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
