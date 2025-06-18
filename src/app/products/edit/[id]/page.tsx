'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Product = {
    name: string;
    price: string;
    barcode: string;
    quantity: string;
};

export default function EditProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product>({ name: '', price: '', barcode: '', quantity: '' });
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`/api/products/${params.id}`);
            const data = await res.json();
            setProduct({
                name: data.name,
                price: data.price.toString(),
                barcode: data.barcode,
                quantity: data.quantity.toString()
            });
        };
        fetchProduct();
    }, [params.id]);

    const handleUpdate = async () => {
        if (!product.name || !product.price || !product.barcode || !product.quantity) {
            alert("❌ All fields required.");
            return;
        }

        const res = await fetch(`/api/products/${params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...product,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity, 10)
            }),
        });

        if (res.ok) {
            alert("✅ Product Updated");
            router.push('/products');
        } else {
            alert("❌ Failed to update");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold">✏️ Edit Product</h2>

            <Input
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <Input
                placeholder="Price"
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
            <Input
                placeholder="Barcode"
                value={product.barcode}
                onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
            />
            <Input
                placeholder="Quantity"
                type="number"
                value={product.quantity}
                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            />

            <Button onClick={handleUpdate}>Update Product</Button>
        </div>
    );
}
