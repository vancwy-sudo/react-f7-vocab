import React from "react";
import {
  Navbar,
  Page,
  Block,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  List,
  ListItem,
  Link,
  Button,
} from "framework7-react";

import { useState, useEffect } from "react";
import PronounceButton from "./PronounceButton";

const WordOfTheDay = () => {
  const [word, setWord] = useState({
    word: "thirstwave",
    definition:
      " a period of hot, dry weather that casuses soil and plants to lose a very large amount of water to evaporation.",
    phonetic: "UK /'ddfd/dus adfds sd",
    examples: ["example 1", "example 2", "example 3"],
  });

  const getwordFromLLM = async () => {
    const randNum = Math.floor(Math.random() * 3000) + 1;

    const prompt = `
    Give me a single word picked from the Oxford 3000 #${randNum}, suitable for english 
    learners whose native language is Chinese
    Respond strictly as minified JSON with the following shape:
    '{"word":string, "definition":string,"phonetic":string,"examples":[string]}'

    You should provide 3 example of the picked word
    `;
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_LLM_API_KEY}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",

          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    const jsonBody = data.choices[0].message.content
      .replace("```json", "")
      .replace("```", "");
    const vocab = JSON.parse(jsonBody);

    setWord(vocab);
  };

  return (
    <>
      <Card content={word.definition} footer={word.phonetic}>
        <h1 slot="header" style={{ margin: 0, display: "flex", gap: 12 }}>
          {word.word}
          <PronounceButton word={word.word} />
        </h1>
      </Card>
      <BlockTitle>Example</BlockTitle>
      {word.examples.map((example, index) => {
        return <Card key={index} content={example} />;
      })}
      <Block>
        <Button fill round lagrge onClick={getwordFromLLM}>
          Get a word
        </Button>
        thirstwave
      </Block>
    </>
  );
};

export default WordOfTheDay;
