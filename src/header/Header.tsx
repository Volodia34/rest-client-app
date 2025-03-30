'use client';
import Button from '@/components/button/Button';
import Image from 'next/image';
import './header.scss';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const { currentLang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`app-header ${isSticky ? 'sticky' : ''}`}>
      <div className="logo">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="header-controls">
        <Button
          className="language-button"
          text={currentLang}
          onClick={toggleLanguage}
        />
        <Button
          className="login-button"
          text={t('header.login')}
          onClick={() => alert('Login clicked')}
        />
        <Button
          className="sign-up-button"
          text={t('header.signup')}
          onClick={() => alert('Sign Up clicked')}
        />
      </div>
    </header>
  );
}
