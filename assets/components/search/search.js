"use client";
import { Input, Button, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "./search.module.css";
import Card from "../card/card";
import axios from "axios";
import Twilio from "../twilio/twilio";

function Search() {
  const [result, setResult] = useState(" ");
  const [J_obj , set_J_obj ] = useState(" ");

  const processPrompts = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    let J_obj = "{}"
    const output = await axios.get("/api/chatBot1", {
      params: {
        prompt: `${event.target.prompt.value}`,
      },
    });

    if (output.data === "Error: Invalid domain!") {
      setResult(output.data);
      set_J_obj(output.data);
    } else if (JSON.stringify(output.data) === "{}") {
      setResult(JSON.stringify(output.data));
      J_obj = output.data;
      set_J_obj(output.data);
    } else {
      const obj = JSON.parse(JSON.stringify(output.data));

      const data = obj.DT;
      const last = data.pop();
      const dataTypeString =
        data.join(", ") + (data.length ? ", and " : "") + last;

      const number = obj.PC.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      J_obj = `${obj.BC} security breach(es) occurred on ${event.target.prompt.value} where hackers gained access to sensitive information of ${number} user accounts. The data stolen included users' ${dataTypeString}. It took ${obj.TTD} days to detect the attack and ${obj.TTR} days to respond to it. The hackers exploited a ${obj.Cause}. The attackers were able to gain access to the data with ${obj.BD} effort.`;

      // setResult(J_obj);

      const finalOutput = await axios.get("/api/chatBot2", {
        params: {
          prompt: `${J_obj}`,
        },
      });

      if (JSON.stringify(finalOutput.data) === "{}") {
        setResult(JSON.stringify(finalOutput.data));
      } else {
        const score = JSON.parse(JSON.stringify(finalOutput.data)).score;
        setResult(`${score}`);
        set_J_obj(J_obj);

      }
    }
  };

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
        </div>
        <div className={styles.card}>
          {result ? <Card text={result} /> : null}
        </div>
      </form>
      {result !== " " ? <Twilio message1={result} message2={J_obj} /> : null}
    </>
  );
}

export default Search;
