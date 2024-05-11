import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await connectToDatabase();

    const post = await Post.findById(id);

    return response.status(200).json(post);
  } catch (err) {
    return response.status(500).json({ error: "Database Error" });
  }
};

export const DELETE = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await connectToDatabase();

    await Post.findByIdAndDelete(id);

    return response.status(200).json({ error: "Post has been deleted" });
  } catch (err) {
    return response.status(500).json({ error: "Database Error" });
  }
};
