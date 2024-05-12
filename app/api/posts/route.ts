import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connectToDatabase();

    const posts = await Post.find(username? { username } : {});

    return NextResponse.json(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newPost = new Post(body);

  try {
    await connectToDatabase();

    await newPost.save();

    return NextResponse.json({ message: "Post has been created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};
