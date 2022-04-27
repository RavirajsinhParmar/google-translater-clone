import React from "react";
import SelectDropDown from "./SelectDropDown";

const TextBox = ({
  selectedLanguage,
  setShowModal,
  style,
  setTextToTranslate,
  textToTranslate,
  translatedText,
  setTranslatedText,
}) => {
  const handleClick = () => {
    setTextToTranslate("");
    setTranslatedText("");
  };
  return (
    <div className={style}>
      <SelectDropDown
        setShowModal={setShowModal}
        selectedLanguage={selectedLanguage}
        style={style}
      />
      <textarea
        placeholder={style === "input" ? "Enter Text" : "Translation"}
        disabled={style === "output"}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style === "input" ? textToTranslate : translatedText}
      />
      {style === "input" && (
        <div className="delete" onClick={handleClick}>
          ×
        </div>
      )}
    </div>
  );
};

export default TextBox;
