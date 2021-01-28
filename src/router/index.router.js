import { Router } from "express";

import { UrlModel } from "../models/Url.model.js";

const indexRouter = Router();

// Get existing urls
indexRouter.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const url = await UrlModel.findOne({ slug });

    if (!url) return res.status(404).json({ message: "404 - not found" });
    else {
      const { longUrl } = url;
      return res.redirect(longUrl);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!" });
  }
});

export default indexRouter;
