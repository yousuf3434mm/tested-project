"use client"; // এই লাইনটি Next.js-কে বলে যে এটি একটি ক্লায়েন্ট-সাইড কম্পোনেন্ট

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // URL থেকে product ID নিচ্ছি

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // পণ্য লোড করার জন্য useEffect
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided in the URL.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/products?id=${productId}`); // GET API থেকে পণ্য ডেটা আনছি
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data.product); // fetched data দিয়ে product state আপডেট করছি
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // productId পরিবর্তন হলে আবার লোড করবে

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // ইনপুট ভ্যালিডেশন (ঐচ্ছিক, সার্ভার-সাইড ভ্যালিডেশনও আছে)
    if (!product.title.trim()) {
      setError("Title cannot be empty.");
      setLoading(false);
      return;
    }
    if (!product.description.trim()) {
      setError("Description cannot be empty.");
      setLoading(false);
      return;
    }
    if (isNaN(product.price) || parseFloat(product.price) < 0) {
      setError("Price must be a positive number.");
      setLoading(false);
      return;
    }
    if (isNaN(product.quantity) || parseInt(product.quantity) < 0) {
      setError("Quantity must be a positive number.");
      setLoading(false);
      return;
    }
    if (isNaN(product.stock) || parseInt(product.stock) < 0) {
      setError("Stock must be a positive number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: productId, // অবশ্যই আইডি পাঠাতে হবে
          title: product.title,
          description: product.description,
          price: parseFloat(product.price), // সংখ্যায় রূপান্তর
          quantity: parseInt(product.quantity), // সংখ্যায় রূপান্তর
          stock: parseInt(product.stock), // সংখ্যায় রূপান্তর
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      setSuccess(true);
      setLoading(false);
      router.push("/products"); // সফল হলে পণ্যের তালিকা পেজে রিডাইরেক্ট
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && !product.title) {
    // প্রাথমিক লোডিং অবস্থা
    return <div className="p-4">Loading product data...</div>;
  }

  if (error && !product.title) {
    // প্রাথমিক লোডিং এর সময় এরর
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 text-center mb-4">
          Product updated successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
