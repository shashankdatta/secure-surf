import { Configuration, OpenAIApi } from "openai";

const getResponse = async (params) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const messages = [
    {
      role: "system",
      content:
        "You are an AI bot that only gives factual information. You only give response if you are confindent.",
    },
    {
      role: "system",
      content:
        "Use approximations for dates, and counts information when exact info is unavailable.",
    },
    {
      role: "system",
      content: `Give output in JSON attributes with appropriate data types: \
      {"BC": <data breaches count>, "PC":  <accounts pwned count>, \
      "DT": <comma separeated list of types of data stolen>, "TTD": <mean days taken to detect the breach>, \
      "TTR": <mean days taken to remedy the breach>, "Cause": <cause of breach in few words>, \
      "BD": <breach difficulty>}`,
    },
    {
      role: "system",
      content:
        "Always only respond with '{}' when you can't find any data breach.",
    },
  ];

  const userInput = prompt("Enter a domain (with extension): ");

  const domainRegex = new RegExp(
    "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$"
  );

  if (!domainRegex.test(userInput)) {
    alert("Invalid domain. Please try again.");
  }

  messages.push({ role: "user", content: userInput });

  const gptResponse = await openai.createCompletion({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
    stop: "}",
  });
  console.log(gptResponse.data.choices[0].text);
};

getResponse();
