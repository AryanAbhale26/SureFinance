import { clerkClient } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";

dotenv.config();

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const session = await clerkClient.sessions.verifySession(token);

    if (!session) {
      return res.status(401).json({ error: "Invalid session" });
    }

    req.user = session.user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
