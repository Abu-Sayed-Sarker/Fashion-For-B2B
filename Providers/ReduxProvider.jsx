// ClientProvider.js
"use client"; // ensures this is treated as a client component

import { store } from "@/Store/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

const ClientProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Optionally, you can render a loading spinner here
  }

  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
