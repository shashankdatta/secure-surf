'use client';
import { Input, Button, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "./search.module.css"
import Card from "../card/card";

function Search() {
  const [result, setResult] = useState("HI");
  
  const processPrompts = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      prompt: event.target.prompt.value,
    };

    // const output = await openaiTextDavinci(data.prompt);

    const output = event.target.prompt.value;
    setResult(event.target.prompt.value);
    console.log(JSON.stringify(output));
    return output;
  };

  async function openaiTextDavinci(prompt) {
    const apiKey = "NULL"; // Replace with your actual OpenAI API key
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    let complete =
      "Here are a series of ingredients, please make me a possible recipe. \n" +
      prompt.toString();

    console.log(typeof prompt);
    const data = JSON.stringify({
      prompt: complete,
      temperature: 0.7,
      max_tokens: 256,
      n: 1,
    });
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: data,
    });
    const json = await response.json();
    setResult(json["choices"][0]["text"]);
  }

  return (
    <>
        <form className={styles.form} onSubmit={processPrompts}>
          <div className={styles.container}>
              <Input
                className={styles.input}
                variant="filled"
                type="text"
                required
                id="prompt"
                size="lg"
                placeholder="somedomain.com"
                width="700px"
                height="50px"
              />
              <Button
                className={styles.button}
                backgroundColor="teal"
                color="white"
                margin-left="10px"
                height="50px"
                size="sm"
                type="submit"
              >
                Submit
              </Button>
            <div className={styles.card}>
              {result ? <Card text={result} /> : null}
            </div>
          </div>
        </form>
      <br/>
    </>
  );
}

export default Search;
