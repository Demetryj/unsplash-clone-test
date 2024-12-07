import { Roboto } from 'next/font/google';
import 'modern-normalize';

import { Layout } from '@/components';

import '@/sass/globals.scss';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: 'Image gallery',
  description: 'Image gallery',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>

      <body className={roboto.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
