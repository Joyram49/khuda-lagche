"server-only";
import { jwtVerify } from "jose";

export async function decryptToken(token) {
  if (!token) return null;
  const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { payload } = await jwtVerify(token, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function decryptRefreshToken(refreshToken) {
  if (!refreshToken) return null;
  const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

  const { payload } = await jwtVerify(refreshToken, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
}
