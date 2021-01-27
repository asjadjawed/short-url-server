import { Router } from "express";
import { nanoid } from "nanoid";
import validator from "validator";

import { UrlModel } from "../models/Url.model.js";

const apiRouter = Router();

// https://zelark.github.io/nano-id-cc/
const nanoIdLength = 15;

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