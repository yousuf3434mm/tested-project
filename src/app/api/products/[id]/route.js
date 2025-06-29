// app/api/products/[id]/route.js
import connectMongoDB from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

/* -------------------------- GET: single product --------------------------- */
export async function GET(_, { params }) {
  const { id } = params; // ► URL এর [...]/products/abc123
  await connectMongoDB();

  const product = await Products.findById(id).lean();
  if (!product) {
    return NextResponse.json(
      { error: "এই ID‑এর কোনো পণ্য নেই" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { product },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
