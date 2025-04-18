'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/UI/buttons/Button';
import { z } from 'zod';
import './formStyles.scss';
import { useLanguageContext } from '@/context/LanguageContext';
import ModalSpinner from '../modalSpinner/ModalSpinner';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one digit' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
  username: z.string().min(1, { message: 'Username is required' }),
});

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguageContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = signUpSchema.safeParse({ email, password, username });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      router.push('/');
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    }
  };

  return (
    <>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>{t('auth.signup') as string}</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('auth.username') as string}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('auth.email') as string}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('auth.password') as string}
          required
        />
        {error && <p>{error}</p>}
        <Button text={t('auth.signup') as string} onClick={() => handleSubmit} />
      </form>
      <ModalSpinner isOpen={loading} />
    </>
  );
};

export default SignUp;
