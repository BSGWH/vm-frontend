import { getRailsURL } from "./utils";

export async function fetchRailsData(path: string): Promise<any> {
  const url: string = `${getRailsURL()}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getAllModelsByMake(): Promise<any> {
  const data = await fetchRailsData("/models");
  return data;
}

