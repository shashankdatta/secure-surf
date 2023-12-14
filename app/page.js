"use client";

// next 13
// beta.nextjs.org
// lot of improvements since next 12
// but 13 still has a bunch of bugs...

import Head from "next/head";
import Search from "../assets/components/search/Search";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./page.module.css";
import coverImage from "../public/SSurfCover.png";

import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionPage } from "twilio/lib/rest/serverless/v1/service/function";

export default function Home() {
  return (
    <ChakraProvider>
      <Head>
        <title>Secure Surf</title>
        <meta name="Secure Surf - Web safety!" content="Enter a domain name to get a Secure Surf Score." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.imageContainer}>
          <Image
            src={coverImage}
            alt="Website Logo"
            width={200}
            height={200}
            placeholder="blur"
            className={styles.image}
          />
        </div>
        <Heading as="h1" className={styles.title}>Secure Surf</Heading>
      </header>
      <main>
        <Text className={styles.description}>
          Please enter a domain name to get a Secure Surf Score.
        </Text>
        <Search />
      </main>
    </ChakraProvider>
  );
}
