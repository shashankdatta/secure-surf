import { Configuration, OpenAIApi } from "openai";

const getGPTResponse2 = async (prompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY_ANSH,
  });
  const openai = new OpenAIApi(configuration);

  const messages = [
    {
      role: "system",
      content:
        "You are a data analyst assistant that weighs metrics to give an overall risk score. You will only answer in whole numbers from 0 to 100 only, representing the overall score.",
    },
    {
      role: "system",
      content:
        "You will use the metrics provided to give an aggregate score for the security risk.",
    },
    {
      role: "system",
      content:
        "A higher score means that a business is more risky. This will depend on the metrics provided.",
    },
    {
      role: "system",
      content: `You will only answer in the format: {"score": 89}.`,
    },
    {
      role: "system",
      content: "If you can't respond with a score, say: {}",
    },
    {
      role: "user",
      content: "hello",
    },
    {
      role: "assistant",
      content: `{}`,
    },
    {
      role: "user",
      content:
        "1 security breach(es) occurred on anshgwash.com where hackers gained access to sensitive information of 10 user accounts. The data stolen included users' names, email addresses, telephone numbers, dates of birth, and hashed passwords. It took 82 days to detect the attack and 66 days to respond to it. The attackers were able to gain access to the data with high effort.",
    },
    {
      role: "assistant",
      content: `{"score": 89}`,
    },
    {
      role: "user",
      content:
        "3 security breach(es) occurred on yahoo.com where hackers gained access to sensitive information of 3,000,000,000 user accounts. The data stolen included users' names, email addresses, telephone numbers, dates of birth, and hashed passwords. It took 194 days to detect the attack and 66 days to respond to it. The hackers exploited a state-sponsored actors. The attackers were able to gain access to the data with high effort.",
    },
    {
      role: "assistant",
      content: `{"score": 95}`,
    },
    {
      role: "user",
      content: "sup",
    },
    {
      role: "assistant",
      content: `{}`,
    },
  ];

  messages.push({ role: "user", content: prompt });

  const gptResponse = await openai.createChatCompletion({
    messages: messages,
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 12,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: "}",
  });

  const completion = gptResponse.data.choices[0].message;

  //   messages.push(completion);
  const completionString =
    gptResponse.data.choices[0].message.content.concat("}");
  //   console.log(completionString);
  return completionString;
};

export default getGPTResponse2;
