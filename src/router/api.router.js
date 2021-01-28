import { Router } from "express";
import { nanoid } from "nanoid";
import validator from "validator";
import normalizeUrl from "normalize-url";

import { UrlModel } from "../models/Url.model.js";

const apiRouter = Router();

// https://zelark.github.io/nano-id-cc/
const nanoIdLength = 15;

// Make new short urls
apiRouter.post("/create", async (req, res) => {
  let { longUrl } = req.body;

  if (!validator.isURL(longUrl))
    return res.status(400).json({ message: "Invalid URL!" });

  longUrl = normalizeUrl(longUrl);

  try {
    const slug = nanoid(nanoIdLength);
    const secret = nanoid(nanoIdLength);
    const url = new UrlModel({ longUrl, slug, secret });
    await url.save(); // mongodb will detect collision if any

    return res.json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!" }); // in case of collision, user may retry
  }
});

export default apiRouter;
