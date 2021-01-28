import { Router } from "express";
import { nanoid } from "nanoid";
import validator from "validator";

import { UrlModel } from "../models/Url.model.js";

const apiRouter = Router();

// https://zelark.github.io/nano-id-cc/
const nanoIdLength = 15;

// Get existing urls
apiRouter.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const url = await UrlModel.findOne({ slug });

    if (!url) return res.status(404).json({ error: "404 - not found" });
    else {
      const { longUrl } = url;
      return res.json({ slug, longUrl });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
});

// Make new short urls
apiRouter.post("/create", async (req, res) => {
  const { longUrl } = req.body;

  if (!validator.isURL(longUrl))
    return res.status(400).json({ error: "Invalid URL!" });

  try {
    const slug = nanoid(nanoIdLength);
    const secret = nanoid(nanoIdLength);
    const url = new UrlModel({ longUrl, slug, secret });
    await url.save(); // mongodb will detect collision if any

    return res.json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" }); // in case of collision, user may retry
  }
});

export default apiRouter;
