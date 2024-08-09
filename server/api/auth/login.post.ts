import { defineEventHandler, readBody, setCookie } from "h3";
import { users } from "~/server/data/customers";

import { generateToken } from "~/server/utils/jwt";
import { sessions } from "~/server/data/sessions";
import { nanoid } from "nanoid";
import { AuthRequestBody } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<AuthRequestBody>(event);
  const { username, password } = body;

  if (!username || !password) {
    event.res.statusCode = 400;
    return { message: "Username and password are required" };
  }

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    event.res.statusCode = 401;
    return { message: "Invalid credentials" };
  }

  const token = generateToken(user.id);

  // For JWT authentication
  return { token };

  // For session-based authentication (if applicable)
  //   const sessionId = nanoid();
  //   sessions[sessionId] = user.id.toString();
  //   setCookie(event, "sessionId", sessionId, { httpOnly: true });

  //   return { message: "Login successful" };
});
