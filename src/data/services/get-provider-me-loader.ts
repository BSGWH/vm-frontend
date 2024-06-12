import { getProviderAuthToken } from "./get-token";
import { getRailsURL } from "@/lib/utils";
import qs from "qs";

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getProviderMeLoader() {
  const baseUrl = getRailsURL();

  const url = new URL("api/v1/providers/me", baseUrl);


  url.search = query;

  const authToken = await getProviderAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}