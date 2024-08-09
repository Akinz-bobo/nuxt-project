import { defineEventHandler } from "h3";
import { users } from ".";

export default defineEventHandler((event) => {
  const userId = event.context.userId;
  if (!userId) {
    event.res.statusCode = 401;
    return { message: "Unauthorized" };
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    event.res.statusCode = 404;
    return { message: "User not found" };
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    message: "Success",
  };
});
