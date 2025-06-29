import connectMongoDB from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

/* --------------------------- POST: Create product --------------------------- */
export async function POST(request) {
  const { title, description, price, quantity, stock } = await request.json();

  // সাধারণ ইনপুট ভ্যালিডেশন
  if (!title?.trim() || !description?.trim()) {
    return NextResponse.json(
      { error: "title এবং description ফাঁকা রাখা যাবে না" },
      { status: 400 }
    );
  }

  await connectMongoDB();
  const newProduct = await Products.create({
    title,
    description,
    price,
    quantity,
    stock,
  });

  // ✨ _id সহ রেসপন্স
  return NextResponse.json(
    { message: "Product created successfully", product: newProduct },
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
}

/* ---------------------------- GET: All products ----------------------------- */
export async function GET() {
  await connectMongoDB();
  const products = await Products.find().sort({ createdAt: -1 }).lean();

  // lean() দিলে পারফ‑অপ্টিমাইজ; _id ডিফল্টই থাকবে
  return NextResponse.json(
    { products },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

/* ---------------------------- DELETE: One product --------------------------- */
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id"); // (_id) query param আশা করছি

  if (!_id) {
    return NextResponse.json(
      { error: "_id query param লাগবে" },
      { status: 400 }
    );
  }

  await connectMongoDB();
  const deleted = await Products.findByIdAndDelete(_id);

  if (!deleted) {
    return NextResponse.json({ error: "এই _id‑এর পণ্য নেই" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

/* ----------------------------- PUT: Update product -------------------------- */
export async function PUT(request) {
  const { _id, title, description, price, quantity, stock } =
    await request.json();

  if (!_id) {
    return NextResponse.json({ error: "_id দিতে হবে" }, { status: 400 });
  }

  const updateFields = {};
  if (title !== undefined) {
    if (!title.trim())
      return NextResponse.json(
        { error: "title ফাঁকা রাখা যাবে না" },
        { status: 400 }
      );
    updateFields.title = title;
  }
  if (description !== undefined) {
    if (!description.trim())
      return NextResponse.json(
        { error: "description ফাঁকা রাখা যাবে না" },
        { status: 400 }
      );
    updateFields.description = description;
  }
  if (price !== undefined) {
    if (typeof price !== "number" || price < 0)
      return NextResponse.json(
        { error: "price ধনাত্মক সংখ্যা হতে হবে" },
        { status: 400 }
      );
    updateFields.price = price;
  }
  if (quantity !== undefined) {
    if (typeof quantity !== "number" || quantity < 0)
      return NextResponse.json(
        { error: "quantity ধনাত্মক সংখ্যা হতে হবে" },
        { status: 400 }
      );
    updateFields.quantity = quantity;
  }
  if (stock !== undefined) {
    if (typeof stock !== "number" || stock < 0)
      return NextResponse.json(
        { error: "stock ধনাত্মক সংখ্যা হতে হবে" },
        { status: 400 }
      );
    updateFields.stock = stock;
  }

  await connectMongoDB();
  const updatedProduct = await Products.findByIdAndUpdate(
    _id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return NextResponse.json(
      { error: "এই _id‑এর কোনো পণ্য খুঁজে পাওয়া যায়নি" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Product updated successfully", product: updatedProduct },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
