// _app.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from 'react';

import "@/styles/globals.css";
import Menu from "@/components/menu";
import { MenuContextProvider } from "@/context/appcontext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MenuContextProvider>
        <Menu />
        <Component {...pageProps} />
      </MenuContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
