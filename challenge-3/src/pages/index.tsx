import  DomainCart, { DomainItem }  from "@/components/challenge";
import MenuComponent from "@/components/menu";
import { Container } from "@chakra-ui/react";
import Head from "next/head";
import Cart from "./cart";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Challenge 3</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container paddingY={12}>
        <DomainCart numDomainsRequired = {12}/>
      </Container>
    </>
  );
}
