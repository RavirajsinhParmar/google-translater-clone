import { useEffect, useState } from "react";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import TextBox from "./components/TextBox";
import axios from "axios";
const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Polish");
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  const getLanguages = async () => {
    const response = await axios("http://localhost:8000/languages");
    setLanguages(response.data);
  };

  const translate = async () => {
    const data = {
      textToTranslate,
      outputLanguage,
      inputLanguage,
    };
    const response = await axios("http://localhost:8000/translate", {
      params: data,
    });
    setTranslatedText(response.data);
  };

  console.log(translatedText, "translated text");
  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            selectedLanguage={inputLanguage}
            style="input"
            setShowModal={setShowModal}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            selectedLanguage={outputLanguage}
            style="output"
            setShowModal={setShowModal}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate()}>
            <Button />
          </div>
        </>
      )}

      {showModal && (
        <Modal
          languages={languages}
          setShowModal={setShowModal}
          chosenLanguage={
            showModal === "input" ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === "input" ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  );
};

export default App;
