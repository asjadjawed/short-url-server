import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortUrl: {
      type: String,
      unique: true, // to avoid collision in some million years
      required: true,
    },
    secret: { type: String, required: true },
  },
  { timestamps: true }
);

export const UrlModel = mongoose.model("Url", urlSchema);
