import { base_url } from "@/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: base_url, // Provide base URL here
  prepareHeaders: (headers, { getState }) => {
    // Retrieve token from Redux state
    const token = getState().auth?.accessToken || null;

    headers.set("ngrok-skip-browser-warning", "true"); // Set ngrok header  
    // If token is available, set it in the headers
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      // Fallback to `localStorage` if token is missing from Redux state
      const authData = JSON.parse(localStorage.getItem("auth")); // Parse the `auth` object from local storage
      if (authData?.accessToken) {
        headers.set("authorization", `Bearer ${authData.accessToken}`); // Set Authorization header
      }
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["fashionTechpacks"], // Define your tags here
  endpoints: () => ({}), // Define your API endpoints here
});
