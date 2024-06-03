import { getRailsURL, getStrapiURL } from "@/lib/utils";

interface RegisterUserProps {
  user: {
    password: string;
    email: string;
    password_confirmation: string;
  }
}

interface LoginUserProps {
  user: {
    email: string;
    password: string;
  }
}

interface ResendProps {
    email: string;
}

const baseUrl = getRailsURL();

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/v1/user/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/v1/user/login", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await response.json();
      return { ...jsonResponse, ok: response.ok };
    } else {
      const textResponse = await response.text();
      return { error: textResponse, ok: response.ok };
    }
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function resendConfirmation(userData: ResendProps) {
  const url = new URL("/api/v1/resend_confirmation", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });
    console.log('Resend sent')
    return response.json();
  } catch (error) {
    console.error("Resend confirmation Error:", error);
  }
}