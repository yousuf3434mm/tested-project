'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AddProductPage() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        barcode: '',
        quantity: ''
    });

    const handleSubmit = async () => {
        if (!product.name || !product.price || !product.barcode || !product.quantity) {
            alert("All fields are required.");
            return;
        }

        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...product,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity, 10)
            })
        });

        if (res.ok) {
            alert("✅ Product Added");
            setProduct({ name: '', price: '', barcode: '', quantity: '' });
        } else {
            alert("❌ Failed to add product");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold">➕ Add New Product</h2>

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

            <Button onClick={handleSubmit}>Save Product</Button>
        </div>
    );
}
