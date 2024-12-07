'use client';

import { SessionProvider } from 'next-auth/react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
