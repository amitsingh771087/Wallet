import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const endpoint = req.originalUrl;

    const { success } = await ratelimiter.limit(`${ip}:${endpoint}`);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }

    next();
  } catch (error) {
    console.log("Error in rate limiter middleware: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default rateLimiter;