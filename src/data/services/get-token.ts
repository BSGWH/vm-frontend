import { cookies } from "next/headers";

export async function getUserAuthToken() {
  const authToken = cookies().get("jwt-user")?.value;
  return authToken;
}

export async function getProviderAuthToken() {
  const authToken = cookies().get("jwt-provider")?.value;
  return authToken;
}