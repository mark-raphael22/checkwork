import mongoose from "mongoose";

const clubsSchema = mongoose.Schema(
    {
      name: { type: String, required: true, default: "" },
      description: { type: String, required: true, default: "" },
      image: { type: String,  default: "" },
      posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
      members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  );
  
  export const Club = mongoose.model("Club", clubsSchema);