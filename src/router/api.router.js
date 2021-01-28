import { Router } from "express";
import { nanoid } from "nanoid";
import validator from "validator";

import { UrlModel } from "../models/Url.model.js";

const apiRouter = Router();

// https://zelark.github.io/nano-id-cc/
const nanoIdLength = 15;

// Get existing urls
apiRouter.get("/:slug", async (req, res) => {
  const shortUrl = process.env.BASE_URL + req.params.slug;

  if (process.env.NODE_ENV === "production" && !validator.isURL(shortUrl))
    return res.status(500).json({ error: "Invalid URL!" });

  try {
    const url = await UrlModel.findOne({ shortUrl });

    if (!url) return res.status(404).json({ error: "URL not found!" });
    else return res.json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" });
  }
});

// Make new short urls
apiRouter.post("/create", async (req, res) => {
  const baseUrl = process.env.BASE_URL;
  const { longUrl } = req.body;

  if (!validator.isURL(longUrl))
    return res.status(400).json({ error: "Invalid URL!" });

  try {
    const shortUrl = baseUrl + nanoid(nanoIdLength);
    const secret = nanoid(nanoIdLength);
    const url = new UrlModel({ longUrl, shortUrl, secret });
    await url.save(); // mongodb will detect collision if any

    return res.json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error!" }); // in case of collision, user may retry
  }
});

export default apiRouter;
