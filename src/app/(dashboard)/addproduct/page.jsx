'use client';

import React from 'react';
import EditProduct from '@/components/editproduct/EditProduct';

/* ---------- POST a new product ---------- */
export async function createProduct(data) {
    const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('পণ্য তৈরি করা যায়নি');
    return res.json(); // { message: 'Product created successfully', ... }
}

export default function Page() {
    return (
        <div className="p-4">
            {/* এখানে EditProduct‑কে createProduct হ্যান্ডলার পাঠাচ্ছি */}
            <EditProduct onSubmit={createProduct} />
        </div>
    );
}
