import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await connectToDatabase();

    const post = await Post.findById(id);
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }

    return response.status(200).json(post);
  } catch (err) {
    return response.status(500).json({ error: "Database Error" });
  }
};

export const DELETE = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await connectToDatabase();

    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ error: "Post not found to delete" });
    }

    return response.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    return response.status(500).json({ error: "Database Error" });
  }
};
