"use client";

import Link from "next/link";
import Image from "next/image";
import photo from "@/img/image.jpg";

const OutOfStock = ({ products = [] }) => {
  const outOfStock = products.filter((p) => Number(p.stock) === 0);

  if (outOfStock.length === 0) {
    return (
      <section className="text-gray-100 body-font bg-purple-800 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold drop-shadow-md">
          🎉 এখন সব পণ্যই স্টকে রয়েছে!
        </h1>
      </section>
    );
  }

  return (
    <section className="text-gray-100 body-font bg-purple-800 min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-md">
          Out&nbsp;of&nbsp;Stock&nbsp;Products
        </h1>

        <div className="flex flex-wrap -m-4 justify-center">
          {outOfStock.map((p) => (
            <div
              key={p._id}
              className="lg:w-1/4 md:w-1/2 p-4 w-full transition-transform duration-300 transform hover:scale-105"
            >
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-purple-800">
                <Link href={`/products/${p._id}`} className="group">
                  <Image
                    alt={p.title}
                    src={photo /* চাইলে p.image || photo */}
                    width={300}
                    height={300}
                    className="object-cover object-center w-full h-48 transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="p-4">
                  <h2 className="text-white text-lg font-semibold">
                    {p.title}
                  </h2>
                  <h3 className="text-purple-200 text-sm mb-2">
                    {p.description ?? "No description"}
                  </h3>
                  <p className="text-purple-100 font-medium">
                    ৳ {Number(p.price).toFixed(2) ?? "0.00"}
                  </p>
                  <p className="text-sm text-purple-300 font-semibold mt-1">
                    Available: 0
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutOfStock;
