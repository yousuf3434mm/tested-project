'use client';

import { useEffect, useState } from 'react';
import { getProductById } from '@/lib/api';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(parseInt(params.id));
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center min-h-screen">Product not found</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-96">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative w-full h-24">
                <Image
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-500">{product.brand}</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold">${product.price}</p>
            <p className="text-green-600">-{product.discountPercentage}% off</p>
            <p className="text-sm text-gray-500">Rating: {product.rating}/5</p>
            <p className="text-sm text-gray-500">Stock: {product.stock} units</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <p className="text-gray-600 capitalize">{product.category}</p>
          </div>
          <Button className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
} 