import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { Chip } from "./Chip";

interface IProps {
  fieldOnChange: (value: string) => void;
  fieldValue: string;
  getOptions: (query: string) => Promise<{ label: string; value: string }[]>;
  initialOptions?: { label: string; value: string }[];
  chipStyle: { backgroundColor: string; fontColor: string };
}

export const AutoSuggest = ({
  fieldOnChange,
  fieldValue,
  getOptions,
  initialOptions = [],
  chipStyle = { backgroundColor: "#4c4d4d", fontColor: "#fff" },
}: IProps) => {
  const [suggestions, setSuggestions] =
    useState<{ label: string; value: string }[]>(initialOptions);
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] =
    useState<{ label: string; value: string }[]>(initialOptions);

  const handleOnChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: { newValue: string }
  ) => {
    setInputValue(newValue);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !fieldValue) {
      event.preventDefault();
    } else if (event.key === "Backspace" && fieldValue) {
      handleRemoveChip(chips.length - 1);
    }
  };

  const getSuggestionValue = (suggestion: { label: string; value: string }) => {
    if (suggestion.value === "") {
      return "";
    }
    return suggestion.label;
  };

  const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
    const suggestionValues = await getOptions(value);
    if (suggestionValues.length) {
      setSuggestions(suggestionValues);
    } else {
      setSuggestions([{ label: "No Search Results", value: "" }]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search",
    value: inputValue,
    onChange: handleOnChange,
    onKeyDown: handleOnKeyDown,
  };

  const renderSuggestion = (suggestion: { label: string; value: string }) => (
    <div>{suggestion.label}</div>
  );

  const shouldRenderSuggestions = (value: string) => {
    return value.length >= 0;
  };

  const handleRemoveChip = (index: number) => {
    if (index > -1) {
      const newChipLabels = chips.filter((_chip, idx) => idx !== index);
      setChips(newChipLabels);
      fieldOnChange(newChipLabels.map((chip) => chip.value)[0]);
    }
  };

  return (
    <div className="mt-1 flex items-center border border-gray-300 rounded-md flex-wrap focus:ring-plazablue500 py-2 text-sm">
      <Chip
        chips={chips}
        handleRemoveChip={handleRemoveChip}
        chipStyle={chipStyle}
      />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={(e, { suggestion }) => {
          setInputValue("");
          setChips([suggestion]);
          fieldOnChange([suggestion].map((chip) => chip.value)[0]);
        }}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        shouldRenderSuggestions={shouldRenderSuggestions}
        focusInputOnSuggestionClick={false}
      />
    </div>
  );
};

const theme = {
  container: "relative w-full",
  input:
    "w-full focus:outline-none border-none text-sm focus:ring-transparent py-0 px-3",
  suggestionsContainerOpen:
    "mt-3 z-10 bg-white block w-full shadow-sm text-sm font-normal rounded-md absolute border-gray-300 border max-h-80 overflow-y-scroll",
  suggestion: "cursor-pointer px-2 py-2 my-1",
  suggestionHighlighted: "bg-gray-600 text-white font-normal",
};
