import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    slug: {
      type: String,
      unique: true, // to index & avoid collision in some million years
      required: true,
    },
    secret: { type: String, required: true },
  },
  { timestamps: true }
);

export const UrlModel = mongoose.model("Url", urlSchema);
