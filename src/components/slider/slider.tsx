import "./slider.css";
import React from "react";
import { Bot } from "../arena/bots.ts";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  bot: Bot;
  setValue: (value: number, bot: Bot) => void;
  label?: string;
}

export const Slider = ({
  value,
  min,
  max,
  bot,
  setValue,
  label,
}: SliderProps) => {
  const getBackgroundSize = () => {
    const percentage = ((value - min) / (max - min)) * 100;
    return { backgroundSize: `${percentage}% 100%` };
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value), bot);
  };

  // Ensure value is within bounds
  const clampedValue = Math.max(min, Math.min(max, value));

  return (
    <div className={"slider-box"}>
      <label className={"slider-label"}>
        {label} : {clampedValue}
      </label>
      <input
        min={min}
        max={max}
        type={"range"}
        className={"slider"}
        step={1}
        value={clampedValue} // Ensure value is set correctly
        onChange={onInput}
        style={getBackgroundSize()}
      />
    </div>
  );
};
