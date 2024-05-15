import { useState } from "react";
import { getRailsURL } from "./utils";

export function usePostRequest() {
  const [responseData, setResponseData] = useState(null);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const postData = async (path: string, body: string) => {
    const url: string = `${getRailsURL()}${path}`;
    fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        // Handle success response here
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        // Handle success data here
        setResponseData(data)
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error here
      });
  };
  return { responseData, postData };
}