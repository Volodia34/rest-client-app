'use client';
import Button from '@/UI/buttons/Button';
import Image from 'next/image';
import './header.scss';
import { useEffect, useState } from 'react';
import { useLanguageContext } from '@/context/LanguageContext';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { currentLang, toggleLanguage, t } = useLanguageContext();
  const isAuth = false;

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
          <Image
            priority={true}
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>
        <div className="header-controls">
          <Button
            className="language-button"
            text={currentLang}
            onClick={toggleLanguage}
          />
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
            <Button
              className="logout-button"
              text={t('header.logout') as string}
              onClick={() => alert('Logout clicked')}
            />
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
