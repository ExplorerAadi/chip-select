import React from "react";
import "./index.css";
import { AutoSuggest } from "./AutoSuggest";

interface IProps {
  onChange: (value: string) => void;
  value: string;
  getChips: (query: string) => Promise<
    {
      label: string;
      value: string;
    }[]
  >;
  initialChips:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  chipStyle: {
    backgroundColor: string;
    fontColor: string;
  };
}

const App = ({
  onChange,
  value,
  getChips,
  initialChips,
  chipStyle,
}: IProps) => {
  return (
    <AutoSuggest
      fieldOnChange={onChange}
      fieldValue={value}
      getOptions={getChips}
      initialOptions={initialChips}
      chipStyle={chipStyle}
    />
  );
};

export default App;
