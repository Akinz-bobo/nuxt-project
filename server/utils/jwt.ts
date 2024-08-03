import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "your_secret_key";

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): { id: number } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && "id" in decoded) {
      return decoded as { id: number };
    }
    return null;
  } catch (error) {
    return null;
  }
};
