import { defineEventHandler, readBody } from "h3";
import { users } from "~/server/data/customers";
import { SignupRequestBody } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<SignupRequestBody>(event);
  const { username, password, email } = body;

  if (!username || !password || !email) {
    event.res.statusCode = 400;
    return { message: "All fields are required" };
  }

  const existingUser = users.find(
    (user) => user.username === username || user.email === email
  );
  if (existingUser) {
    event.res.statusCode = 409;
    return { message: "User already exists" };
  }

  const newUser = {
    id: users.length + 1,
    username,
    password, // In a real-world app, hash the password
    email,
  };

  users.push(newUser);
  event.res.statusCode = 201;
  return { message: "User created successfully" };
});
