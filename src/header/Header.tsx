'use client';
import Button from '@/components/button/Button';
import Image from 'next/image';
import './header.scss';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

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
        <Image src="/next.svg" alt="Logo" width={100} height={100} />
      </div>
      <Button
        className="login-button"
        text="Login"
        onClick={() => alert('Login clicked')}
      />
      <Button
        className="sign-up-button"
        text="Sign Up"
        onClick={() => alert('Sign Up clicked')}
      />
    </header>
  );
}
