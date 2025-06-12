// pages/_app.tsx
import type { AppProps } from 'next/app';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
