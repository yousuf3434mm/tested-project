
import OutOfStock from '../../../components/outofstock/OutOfStock';

export const dynamic = 'force-dynamic'; // ↔ ক্যাশ এড়িয়ে প্রতি রিকোয়েস্টে নতুন ডেটা

/** সার্ভার‑কম্পোনেন্টে ডেটা ফেচ */
async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',               // → dev/prod দুটোতেই ফ্রেশ ডেটা
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  const { products } = await res.json();
  return products;
}

export default async function Page() {
  const products = await getProducts();

  return <OutOfStock products={products} />;
}
