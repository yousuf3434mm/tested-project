import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await Topic.create({
        title,
        description,});
    return NextResponse.json(
        { message: "Topic created successfully" },
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find().sort({ createdAt: -1 });
    return NextResponse.json(
        { topics },
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json(
        { message: "Topic deleted successfully" },
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}   