import { useState } from "react";

const VoiceSearchButton = ({ setSearchQuery }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      console.log("Recognized speech:", transcript);
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "network") {
        alert("Network error! Please check your internet connection and try again.");
      } else if (event.error === "not-allowed") {
        alert("Microphone access denied! Please allow microphone permissions.");
      } else {
        alert(`Error: ${event.error}`);
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <button
        onClick={handleVoiceSearch}
        className="p-2 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 hover:cursor-pointer"
      >
        <img
          src={
            isListening
              ? "/images/sound-recognition.png"
              : "/images/microphone.png"
          }
          alt="Voice Search"
          className="h-8 w-10"
        />
      </button>

      <button className="p-2 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 hover:cursor-pointer mr-2">
        <img
          src="https://img.icons8.com/ios/50/1A1A1A/search--v1.png"
          alt="Search"
          className="h-6 w-6 mr-5"
        />
      </button>
    </>
  );
};

export default VoiceSearchButton;
