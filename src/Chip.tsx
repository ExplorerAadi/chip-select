import React from "react";
import { FilterRemoveIcon } from "../assets/Icon";

export const Chip = ({
  chips,
  handleRemoveChip,
  chipStyle,
}: {
  chips: { label: string; value: string }[];
  handleRemoveChip: (index: number) => void;
  chipStyle: { backgroundColor: string; fontColor: string };
}) => {
  return (
    <>
      {chips?.map((chip, index) => (
        <span
          key={`${chip}-${index}`}
          className="text-xs mx-3 mb-1 px-2 py-1 rounded"
          style={{
            backgroundColor: chipStyle.backgroundColor,
            color: chipStyle.fontColor,
          }}
        >
          {chip.label}
          <button
            type="button"
            onClick={() => handleRemoveChip(index)}
            className="ml-2 text-white"
          >
            <FilterRemoveIcon />
          </button>
        </span>
      ))}
    </>
  );
};
