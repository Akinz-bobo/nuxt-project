import { defineEventHandler } from "h3";
import { verifyToken } from "~/server/utils/jwt";

export default defineEventHandler((event) => {
  const token = event.req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = verifyToken(token);
    if (decoded && typeof decoded.id === "number") {
      event.context.userId = decoded.id;
      return;
    }
  }
});
