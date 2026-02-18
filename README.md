## Inspiration
The idea for this project came to us when one of us received an email from an online security service to alert us that a password had been compromised in a recent data breach. Data breaches are getting more and more common by the day. I'm sure we all know multiple people that have had their Instagram or Facebook hacked. No one is immune to it. However, with the right tools you can greatly reduce the likelihood of your sensitive data being compromised.

We hoped to find dozens of free security score finders to determine the level of risk associated with a service or domain's history. However, we were surprised when we found only a couple, hidden behind paywalls.

**That's when it hit us.** It would be so useful to have a website and text bot that would quickly give you a risk score based on important metrics such as number of accounts, types of data, time taken for the service to respond to an attack, and so on.

## What it does
```
if (website != safe) {
    while (you.can()) {
        run();
    }
}
```

Jokes apart, our web app and Twilio text bot allows users to input a domain. When they click search, the web app or Twilio text bot outputs a risk score for the domain from 0-100 based on industry standard metrics such as:

- Number of breaches
- Number of accounts
- Types of data stolen
- Description of attack
- Time taken to detect the attack
- Time taken to respond to the attack
- Cause of data breach
- Technical difficulty and complexity of the breach

## How we built it
We used the Next.js framework to build our web app. With server-side rendering it gives better performance. It is also easy and fast to develop with and deploy on hosting platforms like Vercel. 

- For the front-end and components we used Chakra UI as it is a fast and easy way to build a robust UI. This freed up valuable time for the back-end integration with GPT. 

- For the Chat Completion model we used, we tried and tested several OpenAI models like babbage, davinci etc. and found gpt-3.5-turbo to be the best one in terms of accuracy. We trained two separate models, one to provide us with the metrics about a domain's safety in a given format, and the other to turn those metrics into a singular risk score. 0 being no risk and 100 being very high risk.

## Challenges we ran into
- Training the OpenAI Model

- Learning how to integrate GPT into our Next.js web app

## Accomplishments that we're proud of

## What we learned
I think we learned a lot about how useful and powerful a well trained GPT model can be. After we trained the model, we were getting accurate factual responses and metrics for every valid domain we input. We also learned that even a simple front-end can be extremely time consuming if you start to obsess over the smallest details.

## What's next for Secure Surf
In order to verify and make sure that the score we provided is more accurate, we want to integrate results from the Have I Been Pwned API into the score generator. This will also allow for redundancy in the cases where the GPT 3.5 Turbo model has not been trained. We would also like to deploy our web app on Vercel so that it can be accessed by anyone online. Due to time constraints we were not able to deploy it on our domain.com registered domain: [ssurf.tech](ssurf.tech).

## Links
[Devpost](https://devpost.com/software/secure-surf)
