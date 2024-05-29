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

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}