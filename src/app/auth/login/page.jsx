'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import styles from '@/components/Auth/Auth.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Сталася помилка при вході');
    }
  };

  return (
    <section className="section">
      <div className={`container ${styles.authContainer}`}>
        <div className={styles.wrapper}>
          <h2>Вхід</h2>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <input
              type="email"
              name="email"
              placeholder="Електронна пошта"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <button type="submit">Увійти</button>
          </form>

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </section>
  );
}
