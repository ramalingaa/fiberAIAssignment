// _app.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from 'react';

import "@/styles/globals.css";
import Menu from "@/components/menu";
import { AppContextProvider } from "@/context/appcontext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppContextProvider>
        <Menu />
        <Component {...pageProps} />
      </AppContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
