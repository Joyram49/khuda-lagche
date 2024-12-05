"server-only";

const publicUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export async function refreshAccessToken(token) {
  let url = null;
  if (token?.provider === "credentials") {
    url =
      `${publicUrl}/api/auth/refreshToken?` +
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token?.refresh_token,
      });
  }

  if (token?.provider === "google") {
    url =
      `https://oauth2.googleapis.com/token?` +
      new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_CLIENT_ID,
        client_secret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token?.access_token,
      });
  }

  if (token?.provider === "facebook") {
    const url =
      `https://graph.facebook.com/v21.0/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.AUTH_FACEBOOK_CLIENT_ID,
        client_secret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
        fb_exchange_token: token?.access_token, // Use the short-lived token here
      });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const refreshedTokens = await response.json();

    if (response?.status !== 200 || !response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens?.accessToken || refreshedTokens?.id_token,
      expires_at: Math.floor(Date.now() / 1000 + refreshedTokens?.expires_in),
      refresh_token:
        refreshedTokens?.refreshToken || refreshedTokens?.refresh_token,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
