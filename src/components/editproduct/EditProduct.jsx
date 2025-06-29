'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';



const EditProduct = ({ onSubmit, initial }) => {

const router = useRouter();

    /* ---------- ফর্ম স্টেট ---------- */
    const [form, setForm] = useState({
        title: initial?.title ?? '',
        description: initial?.description ?? '',
        price: initial?.price ?? 0,
        quantity: initial?.quantity ?? 0,
        stock: initial?.stock ?? 0,
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    /* ---------- ইনপুট হ্যান্ডলার ---------- */
    const handleChange = (field) => (e) => {
        const value =
            field === 'price' || field === 'quantity' || field === 'stock'
                ? Number(e.target.value)
                : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    /* ---------- সাবমিট ---------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await onSubmit(form);
            setMsg(res.message || 'সফলভাবে সম্পন্ন হয়েছে ✅');
            router.refresh(); // রিফ্রেশ করে নতুন ডেটা দেখাবে
        } catch (err) {
            setMsg(err?.message ?? 'সাবমিট করতে সমস্যা হয়েছে ❌');
        } finally {
            setLoading(false);
            
        }
        
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4 space-y-2">
            <Input placeholder="Title" value={form.title} onChange={handleChange('title')} />
            <Input placeholder="Description" value={form.description} onChange={handleChange('description')} />
            <Input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange('price')}
            />
            <Input
                placeholder="Quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange('quantity')}
            />
            <Input
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={handleChange('stock')}
            />
            <Button type="submit" className="w-fit" disabled={loading}>
                {loading ? 'Processing…' : 'Update Product'}
            </Button>   

            {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
        </form>
    );
};

export default EditProduct;
