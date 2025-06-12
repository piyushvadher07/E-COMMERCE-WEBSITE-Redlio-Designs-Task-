// components/Layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛍️ E-Shop
        </Link>
        <Link href="/cart" className="text-blue-600 hover:underline">
          🛒 Cart
        </Link>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
