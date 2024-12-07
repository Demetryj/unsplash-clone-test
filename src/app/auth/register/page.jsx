'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from '@/components/Auth/Auth.module.scss';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/register', { name, email, password });
      router.push('/auth/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Сталася помилка');
    }
  };

  return (
    <section className="section">
      <div className={`container ${styles.authContainer}`}>
        <div className={styles.wrapper}>
          <h2>Реєстрація</h2>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <input
              type="text"
              name="name"
              placeholder="Ім'я"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="off"
            />
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
            <button type="submit">Зареєструватися</button>
          </form>

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </section>
  );
}
