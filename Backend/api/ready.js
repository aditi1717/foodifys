import { createVercelHandler } from "../src/vercel/bootstrap.js";

export default createVercelHandler((req) => {
  req.url = "/ready";
});
