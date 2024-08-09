import { defineEventHandler, readBody, setCookie } from "h3";
import { generateToken } from "~/server/utils/jwt";
import { users } from ".";
import { AuthRequestBody } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<AuthRequestBody>(event);
  const { username, password } = body;
  console.log({ username, password });

  if (!username || !password) {
    event.res.statusCode = 400;
    return { message: "Username and password are required" };
  }

  const user = users.find(
    (user) =>
      user.username.toLocaleLowerCase() ===
        username.trim().toLocaleLowerCase() &&
      user.password.toLocaleLowerCase() === password.trim().toLocaleLowerCase()
  );
  if (!user) {
    event.res.statusCode = 401;
    return { message: "Invalid credentials" };
  }

  const token = generateToken(user.id);

  return { token, message: "Success" };
});
