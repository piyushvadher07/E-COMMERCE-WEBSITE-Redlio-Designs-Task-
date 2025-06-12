// pages/index.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

type Variant = {
  size: string;
  color: string;
  price: number;
};

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  variants: Variant[];
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  return {
    props: { products },
  };
}

export default function Home({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600 truncate">{product.description}</p>
          <Link
            href={`/product/${product.id}`}
            className="mt-3 inline-block text-blue-600 hover:underline font-medium"
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
}
