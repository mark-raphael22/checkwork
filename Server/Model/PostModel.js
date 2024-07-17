import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    body: { type: String, default: "", required: true },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
    club: { type: mongoose.Schema.ObjectId, ref: "Club" },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);   

export const Post = mongoose.model("Post", postSchema);

     
