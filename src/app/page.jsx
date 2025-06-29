/* ------------------------------------------------------------------ */
/* app/page.jsx – সার্ভার কম্পোনেন্ট                                  */
/* ------------------------------------------------------------------ */
import Image from "next/image";
import Link from "next/link";
import photo from "@/img/image.jpg";

export const dynamic = "force-dynamic"; // সব রিকোয়েস্টে ফ্রেশ ডেটা

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const { products } = await res.json();
  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <section className="text-gray-100 body-font bg-purple-800 min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Featured Products
        </h1>

        <div className="flex flex-wrap -m-4 justify-center">
          {products
            .filter((p) => Number(p.stock) > 0) // স্টক শূন্য বাদ
            .map((p) => (
              <div
                key={p._id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full transition-transform duration-300 transform hover:scale-105 group"
              >
                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-purple-800">
                  {/* ➜ ডিটেইল পেজ — /products/[id] */}
                  <Link href={`/products/${p._id}`}>
                    <Image
                      alt={p.title}
                      src={p.image || photo}
                      width={300}
                      height={300}
                      className="object-cover object-center w-full h-48 transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-4">
                    <Link href={`/products/${p._id}`}>
                      <h2 className="text-white text-lg font-semibold">
                        {p.title}
                      </h2>
                    </Link>
                    <h3 className="text-purple-200 text-sm mb-2 line-clamp-2">
                      {p.description ?? "No description"}
                    </h3>
                    <p className="text-purple-100 font-medium">
                      ৳ {Number(p.price).toFixed(2)}
                    </p>
                    <p className="text-sm text-purple-300 font-semibold mt-1">
                      Available: {Number(p.stock).toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
