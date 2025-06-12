import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto p-8 text-center bg-white mt-10 shadow rounded">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Back to Home
      </Link>
    </div>
  );
}
