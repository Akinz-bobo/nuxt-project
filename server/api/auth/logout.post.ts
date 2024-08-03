import { defineEventHandler, getCookie, setCookie } from "h3";
import { sessions } from "~/server/data/sessions";

export default defineEventHandler((event) => {
  // For JWT, token invalidation should be handled by the client by deleting the token

  // For session-based authentication
  const sessionId = getCookie(event, "sessionId");
  if (sessionId) {
    delete sessions[sessionId];
    setCookie(event, "sessionId", "", { maxAge: -1 });
  }

  return { message: "Logged out successfully" };
});
