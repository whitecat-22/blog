import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    await connectToDatabase();

    const post = await Post.findById(id);

    return NextResponse.json(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  try {
    await connectToDatabase();

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post has been deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};
