import mongoose from "mongoose";

// Assuming Post.ts is located at src/models/Post.ts
export interface Post {
  _id: string;
  title: string;
  desc: string;
  img: string;
  content: string;
  username: string;
}

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model("Post", postSchema);
