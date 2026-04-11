import app from "../app.js";
import { config } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { connectRedis } from "../config/redis.js";
import { validateConfig } from "../config/validateEnv.js";
import { initializeFirebaseRealtime } from "../config/firebase.js";

let bootstrapPromise = null;

const ensureBootstrap = async () => {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    validateConfig();
    initializeFirebaseRealtime();
    await connectDB();

    if (config.redisEnabled) {
      await connectRedis();
    }
  })().catch((error) => {
    bootstrapPromise = null;
    throw error;
  });

  return bootstrapPromise;
};

const jsonError = (res, error) => {
  if (res.headersSent) {
    return;
  }

  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      success: false,
      message: "Server bootstrap failed",
      error: error?.message || "Unknown error",
    }),
  );
};

export const createVercelHandler = (prepareRequest) => {
  return async (req, res) => {
    try {
      if (typeof prepareRequest === "function") {
        prepareRequest(req);
      }

      await ensureBootstrap();
      return app(req, res);
    } catch (error) {
      console.error("[vercel] bootstrap error:", error);
      return jsonError(res, error);
    }
  };
};
