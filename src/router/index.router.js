import { Router } from "express";
import validator from "validator";

import { UrlModel } from "../models/Url.model.js";

const indexRouter = Router();

indexRouter.get("/:slug", async (req, res) => {
  const shortUrl = process.env.BASE_URL + req.params.slug;

  if (process.env.NODE_ENV === "production" && !validator.isURL(shortUrl))
    return res.status(500).json({ error: "Invalid URL!" });

  try {
    const url = await UrlModel.findOne({ shortUrl });

    if (!url) return res.status(404).json({ error: "URL not found!" });
    else return res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
});

export default indexRouter;
