import { Link, Popover, List, ListItem, Block, Button } from "framework7-react";
import { useState, useEffect } from "react";

const languages = [
  "English",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Emoji",
];

function Translate() {
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("Chinese");
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const translate = async () => {
    const prompt = `
    <content>${originalText}</content>

    Please help me to translate the content from <content /> ${fromLanguage} to ${toLanguage}, respond with the translated content ONLY without any other words.
    `;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_LLM_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.1,
        }),
      }
    );
    const data = await response.json();

    setTranslatedText(data.choices[0].message.content);
  };

  return (
    <>
      <Block>
        <textarea
          style={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 8,
            margin: "1rem 0",
            width: "100%",
            height: "30vh",
            padding: "8px",
          }}
          value={originalText}
          onInput={(e) => setOriginalText(e.target.value)}
        ></textarea>
        <div className="grid grid-cols-2 grid-gap">
          <div>
            <Link
              className="button button-outline button-large"
              popoverOpen=".popover-from-menu"
            >
              {fromLanguage}
            </Link>
          </div>
          <div>
            <Link
              className="button button-outline button-large"
              popoverOpen=".popover-to-menu"
            >
              {toLanguage}
            </Link>
          </div>
        </div>
        <textarea
          style={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 8,
            margin: "1rem 0",
            width: "100%",
            height: "30vh",
            padding: "8px",
          }}
          value={translatedText}
          onInput={(e) => setTranslatedText(e.target.value)}
        ></textarea>

        <Button largeIos fill onClick={translate}>
          Translate
        </Button>
      </Block>

      <Popover className="popover-from-menu">
        <List>
          {languages.map((language) => {
            return (
              <ListItem
                link="#"
                onClick={() => {
                  setFromLanguage(language);
                }}
                popoverClose
                title={language}
              />
            );
          })}
        </List>
      </Popover>

      <Popover className="popover-to-menu">
        <List>
          {languages.map((language) => {
            return (
              <ListItem
                link="#"
                onClick={() => {
                  setToLanguage(language);
                }}
                popoverClose
                title={language}
              />
            );
          })}
        </List>
      </Popover>
    </>
  );
}

export default Translate;
