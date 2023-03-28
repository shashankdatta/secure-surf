import { Input, Button, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import Card from "../card/card";
import axios from "axios";
import TwilioPage from "../twilio/TwilioPage";

function Search() {
  const [score, setScore] = useState(" ");
  const [description, set_description] = useState("Not Available");

  const processPrompts = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const userInput = event.target.prompt.value;

    const domainRegex = new RegExp(
      "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$"
    );

    if (!domainRegex.test(userInput)) {
      setScore("Error: Invalid domain!");
    } else {
      const output = await axios.get("/api/chatBot1", {
        params: {
          prompt: `${userInput}`,
        },
      });

      if (JSON.stringify(output.data) === "{}") {
        setScore(`No data breaches were found on ${userInput}`);
      } else {
        const outputObj = JSON.parse(JSON.stringify(output.data));

        const dataTypes = outputObj.DT;
        const last = dataTypes.pop();
        const dataTypeString =
          dataTypes.join(", ") + (dataTypes.length ? ", and " : "") + last;
        const countToString = outputObj.PC.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );

        const moreInfo = `${outputObj.BC} security breach(es) occurred on ${userInput} where hackers gained access to sensitive information of ${countToString} user accounts. The data stolen included users' ${dataTypeString}. It took ${outputObj.TTD} days to detect the attack and ${outputObj.TTR} days to respond to it. The hackers exploited a ${outputObj.Cause}. The attackers were able to gain access to the data with ${outputObj.BD} effort.`;

        const scoreGen = await axios.get("/api/chatBot2", {
          params: {
            prompt: `${moreInfo}`,
          },
        });

        if (JSON.stringify(scoreGen.data) === "{}") {
          setScore(`No score could be generated on ${userInput}`);
        } else {
          const generatedScore = JSON.parse(
            JSON.stringify(scoreGen.data)
          ).score;
          alert("Score Generation Successful!");
          setScore(`${generatedScore}`);
          set_description(moreInfo);
        }
      }
    }
  };

  return (
    <>
      <form id="d-form" className={styles.form} onSubmit={processPrompts}>
        <Input
          className={styles.input}
          variant="filled"
          type="text"
          required
          id="prompt"
          size="lg"
          placeholder="somedomain.com"
          minWidth="200px"
          height="50px"
        />
        <Button
          className={styles.button}
          backgroundColor="teal"
          color="white"
          margin-left="10px"
          height="50px"
          minWidth="50px"
          maxWidth="250px"
          size="lg"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <div>{score ? <Card text={score} /> : null}</div>
      {description !== "Not Available" ? (
        <TwilioPage score={score} info={description} />
      ) : null}
    </>
  );
}

export default Search;
