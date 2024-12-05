"server-only";
import { SignJWT } from "jose";

// Function to generate tokens
export const getNewTokens = async (user) => {
  const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
  });
  const timestamp = new Date(currentDate).getTime();
  const nowInSeconds = Math.floor(timestamp / 1000);

  const payload = {
    id: user.userId,
    email: user.email,
    name: user.name,
  };

  // Access token (expires in 1 hour)
  const accessToken = await new SignJWT({ ...payload, type: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(nowInSeconds)
    .setExpirationTime("1hr")
    .sign(secretKey);

  // Refresh token (expires in 1 day)
  const refreshToken = await new SignJWT({ ...payload, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(nowInSeconds)
    .setExpirationTime("1day")
    .sign(secretKey);

  return { accessToken, refreshToken, expires_in: 60 * 60 };
};
