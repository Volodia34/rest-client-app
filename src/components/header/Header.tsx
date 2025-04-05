'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Button from '@/UI/buttons/Button';
import Image from 'next/image';
import './header.scss';
import { useEffect, useState } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';
import Link from 'next/link';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { currentLang, toggleLanguage, t } = useLanguageContext();
  const { user, logout, loading } = useAuth();
  const router = useRouter();

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
            <Image
              priority={true}
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
            />
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
                    onClick={() => router.push('/signin')}
                  />
                  <Button
                    className="sign-up-button"
                    text={t('header.signup') as string}
                    onClick={() => router.push('/signup')}
                  />
                </>
              ) : (
                <>
                  <Button
                    className="main-page-button"
                    text={t('header.mainpage') as string}
                    onClick={() => router.push('/')}
                  />
                  <Button
                    className="logout-button"
                    text={t('header.logout') as string}
                    onClick={() => logout()}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
