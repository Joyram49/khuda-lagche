"use server";
import { signIn } from "@/auth";
import { User } from "@/models/user-model";

export const isValidUser = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export async function credentialLogin(email, password) {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!response || !!response?.error) {
      throw new Error("falied to login!!");
    }

    return response;
  } catch (err) {
    console.log("Credential login error response:", err);

    if (err.type === "AuthError") {
      return {
        error: err.message,
      };
    }
    return { error: { message: "Failed to login", error: err } };
  }
}

export async function doSocialLogin(path, formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: path || "/foodItems" });
}
