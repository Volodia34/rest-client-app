'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Button from '@/UI/buttons/Button';
import Image from 'next/image';
import './header.scss';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { currentLang, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div className="container app-header">
        <div className="logo">
          <Image
            priority={true}
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="header-controls">
          <Button
            className="language-button"
            text={currentLang}
            onClick={toggleLanguage}
          />
          {user ? (
            <Button
              className="logout-button"
              text={t('header.logout') as string}
              onClick={logout}
            />
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}
