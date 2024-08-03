import { defineEventHandler } from "h3";
import { verifyToken } from "~/server/utils/jwt";
import { sessions } from "~/server/data/sessions";

export default defineEventHandler((event) => {
  const token = event.req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = verifyToken(token);
    if (decoded && typeof decoded.id === "number") {
      event.context.userId = decoded.id;
      return;
    }
  }

  const sessionId = event.req.headers.cookie?.split("=")[1];
  if (sessionId && sessions[sessionId]) {
    event.context.userId = parseInt(sessions[sessionId], 10);
    return;
  }

  // event.res.statusCode = 401;
  // event.res.end("Unauthorized");
});
