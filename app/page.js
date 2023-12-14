"use client";

import Head from "next/head";
import Search from "../assets/components/search/Search";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./page.module.css";
import coverImage from "../public/SSurfCover.png";

import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionPage } from "twilio/lib/rest/serverless/v1/service/function";

const Header = () => (
  <Box as="header" className={styles.header}>
    <Image
      src={coverImage}
      alt="Website Logo"
      width={200}
      height={200}
      placeholder="blur"
    />
    <Heading as="h1" className={styles.title}>Secure Surf</Heading>
  </Box>
);

export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Secure Surf</title>
        <meta name="description" content="Enter a domain name to get a Secure Surf Score." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box as="main" className={styles.main}>
        <Text className={styles.description}>
          Please enter a domain name to get a Secure Surf Score.
        </Text>
        <Search />
      </Box>
    </ChakraProvider>
  );
}
