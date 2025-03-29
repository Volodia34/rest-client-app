'use client';
import Button from '@/components/button/Button';
import Image from 'next/image';
import './header.scss';

export default function Header() {
  return (
    <header className="app-header">
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
