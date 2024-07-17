import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    article_image: { type: String, default: "" },
    body: { type: String, required: true },
    summary: { type: String, default: "" },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model("Article", articleSchema);