import { useState, useRef, useCallback } from "react";
import { useCanvas } from "./useCanvas.tsx";
import { Slider } from "../slider/slider.tsx";
import { Bot } from "./bots.ts";
import { ColorInput } from "./colorInput.tsx";

export const Arena = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [colorInputVisible, setColorInputVisible] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const bot1 = useRef(new Bot({ speed: 2 })).current;
  const bot2 = useRef(
    new Bot({ speed: -2, color: "blue", spellColor: "blue" }),
  ).current;
  const [bot1Speed, setBot1Speed] = useState(Math.abs(bot1.speed));
  const [bot1APS, setBot1APS] = useState(bot1.APS);
  const [bot2Speed, setBot2Speed] = useState(Math.abs(bot2.speed));
  const [bot2APS, setBot2APS] = useState(bot2.APS);

  const handleBotClick = useCallback((bot: Bot) => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
    setSelectedBot(bot);
    setColorInputVisible(true);
  }, []);

  const handleColorChange = (color: string) => {
    if (selectedBot) {
      selectedBot.spellColor = color;
    }
    setColorInputVisible(false);
  };

  useCanvas(canvasRef, bot1, bot2, handleBotClick);

  return (
    <div className="arena-wrapper">
      <canvas className={"canvas-arena"} ref={canvasRef} />
      <div className="bot-options">
        <div className="control bot1-control">
          <Slider
            bot={bot1}
            label={"Player 1 Speed"}
            min={1}
            max={10}
            value={bot1Speed}
            setValue={(value) => {
              setBot1Speed(value);
              bot1.setSpeed(value);
            }}
          />
          <Slider
            bot={bot1}
            label={"Player 1 Attack Per Second"}
            min={1}
            max={10}
            value={bot1APS}
            setValue={(value) => {
              setBot1APS(value);
              bot1.setAPS(value);
            }}
          />
        </div>
        <div className="control bot2-control">
          <Slider
            bot={bot2}
            label={"Player 2 Speed"}
            min={1}
            max={10}
            value={bot2Speed}
            setValue={(value) => {
              setBot2Speed(value);
              bot2.setSpeed(value);
            }}
          />
          <Slider
            bot={bot2}
            label={"Player 2 Attack Per Second"}
            min={1}
            max={10}
            value={bot2APS}
            setValue={(value) => {
              setBot2APS(value);
              bot2.setAPS(value);
            }}
          />
        </div>
      </div>
      {selectedBot && (
        <ColorInput
          visible={colorInputVisible}
          x={selectedBot.x}
          y={selectedBot.y}
          value={selectedBot.spellColor}
          changeValue={handleColorChange}
          ref={colorInputRef}
        />
      )}
    </div>
  );
};
