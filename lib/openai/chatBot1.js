import { Configuration, OpenAIApi } from "openai";

const getGPTResponse = async (prompt) => {
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
      content: `Give output in JSON attributes with appropriate data types: {"BC": <data breaches count>, "PC":  <accounts pwned count>, "DT": <comma separeated list of types of data stolen>, "TTD": <mean days taken to detect the breach>, "TTR": <mean days taken to remedy the breach>, "Cause": <cause of breach in few words>,   "BD": <breach difficulty>}`,
    },
    {
      role: "system",
      content:
        "When you can't answer in the given format, respond with '{}' only.",
    },
    {
      role: "user",
      content: "test.com",
    },
    {
      role: "assistant",
      content: `{"BC": 1, "PC": 300000, "DT": ["names", "email addresses", "telephone numbers", "dates of birth", "hashed passwords", "security questions", "answers"], "TTD": 2.3, "TTR": 3.5, "Cause": "key logger was injected to the main frame through a targeted employee", "BD": "high"}`,
    },
    {
      role: "user",
      content: "Hi how are you?",
    },
    {
      role: "assistant",
      content: `{}`,
    },
    {
      role: "user",
      content: "shopify.com",
    },
    {
      role: "assistant",
      content: `{"BC": 1, "PC": 200000, "DT": ["names", "email addresses", "physical addresses", "phone numbers", "order details"], "TTD": 5, "TTR": 4, "Cause": "two rogue members of support team accessed customer transactional records of some merchants", "BD": "low"}`,
    },
  ];

  const domainRegex = new RegExp(
    "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$"
  );

  if (!domainRegex.test(prompt)) {
    return "Error: Invalid domain!";
  }

  messages.push({ role: "user", content: prompt });

  const gptResponse = await openai.createChatCompletion({
    messages: messages,
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 350,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
    stop: "}",
  });

  const completion = gptResponse.data.choices[0].message;

  messages.push(completion);
  const completionString =
    gptResponse.data.choices[0].message.content.concat("}");
  return completionString;
};

export default getGPTResponse;
