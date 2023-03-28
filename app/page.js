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

export default function Home() {
  return (
    <body className={styles.body}>
      <ChakraProvider className={styles.ChakraProvider}>
        <header>
          <div className={styles.imageContainer}>
            <Image
              src={coverImage}
              className={styles.coverImage}
              width={200}
              height={200}
              placeholder="blur"
              alt="Website Logo"
              priority
            />
          </div>
          <h1 className={styles.title}>Secure Surf</h1>
          <p className={styles.description}>
            Please enter a domain name to get a Secure Surf Score.
          </p>
        </header>
        <div className={styles.content}>
          <Head>
            <title>Secure Surf</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Search />
        </div>
      </ChakraProvider>
    </body>
  );
}
