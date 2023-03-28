import { Input, Button, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "./TwilioPage.module.css";
import axios from "axios";

const TwilioPage = ({ score, info }) => {
  const handleSend = async (e) => {
    e.preventDefault();

    const phone = e.target.prompt.value;
    const phoneStripped = phone
      .replace(/\s/g, "")
      .replace(/[(]/g, "")
      .replace(/[)]/g, "")
      .replace(/[-]/g, "");

    const res = await axios.get("/api/twilio", {
      params: {
        phone: `${phoneStripped}`,
        message: `Information:\n${info}\n\nScore:\n${score}`,
      },
    });

    const responseData = await res.data;

    if (responseData.status == 400) {
      alert(
        "Twilio Server Error! SMS cannot be sent at this time. Please try again later."
      );
    } else {
      alert("Message Sent!");
    }
  };

  return (
    <>
      <form id="t-form" className={styles.form} onSubmit={handleSend}>
        <div className={styles.container}>
          <h1 className={styles.heading}>SMS:</h1>

          <Input
            className={styles.input}
            variant="filled"
            type="tel"
            required
            id="prompt"
            size="lg"
            placeholder="+1 (891)-974-5825"
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
      </form>
    </>
  );
};

export default TwilioPage;
