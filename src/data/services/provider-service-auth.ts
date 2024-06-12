import { getRailsURL } from "@/lib/utils";

interface RegisterProviderProps {
  provider: {
    password: string;
    email: string;
    password_confirmation: string;
  }
}

interface LoginProviderProps {
  provider: {
    email: string;
    password: string;
  }
}

interface ResendProps {
    email: string;
}

const baseUrl = getRailsURL();

export async function registerProviderService(userData: RegisterProviderProps) {
  const url = new URL("/api/v1/providers/register", baseUrl);

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

export async function loginProviderService(userData: LoginProviderProps) {
  const url = new URL("/api/v1/providers/login", baseUrl);

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

export async function resendProviderConfirmation(userData: ResendProps) {
  const url = new URL("/api/v1/providers/resend_confirmation", baseUrl);

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