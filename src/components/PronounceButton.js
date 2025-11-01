import { useState } from "react";

function PronounceButton({ word }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePronunciation = async () => {
    if (!word?.trim()) {
      console.error("No word provided for pronunciation");
      return;
    }

    setIsPlaying(true);

    //Call
    const response = await fetch(
      //   "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en",
      "https://api.deepgram.com/v1/speak?model=aura-2-apollo-en",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REACT_APP_DEEPGRAM_API_KEY}`,
        },
        body: JSON.stringify({
          text: word,
        }),
      }
    );

    const audioBlob = await response.blob();

    //Call
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.onended = () => {
      setIsPlaying(false);
      URL.revokeObjectURL(audioUrl);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      URL.revokeObjectURL(audioUrl);
    };

    audio.play();
  };

  return (
    <button
      onClick={handlePronunciation}
      style={{
        width: 36,
        background: "transparent",
        border: 0,
        display: "flex",
        color: "#007aff",
      }}
      disabled={isPlaying}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
        />
      </svg>
    </button>
  );
}

export default PronounceButton;
