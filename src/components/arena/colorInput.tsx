import React, { ChangeEvent, forwardRef } from "react";

interface ColorInputProps {
  x: number;
  y: number;
  visible: boolean;
  value: string;
  changeValue: (value: string) => void;
}

export const ColorInput = forwardRef(
  (
    { x, y, visible, changeValue, value }: ColorInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      changeValue(event.target.value);
    };
    return (
      <div
        className={"color-box"}
        style={{ top: y, left: x, visibility: visible ? "visible" : "hidden" }}
      >
        <input ref={ref} type="color" value={value} onChange={inputHandler} />
      </div>
    );
  },
);
