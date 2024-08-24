import { RefObject, useEffect } from "react";
import { Bot } from "./bots.ts";

// interface Projectile {
//     x: number;
//     y: number;
//     size: number;
//     speed: number;
//     color: string;
// }
//

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement> | null,
  bot1: Bot,
  bot2: Bot,
  onBotClick: (bot: Bot) => void,
) => {
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let mouse = { x: 0, y: 0 };

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      mouse = { x: event.clientX, y: event.clientY };
    });
    canvas.addEventListener("click", (event: MouseEvent) => {
      const clickX = event.clientX;
      const clickY = event.clientY;

      if (bot1.isClicked(clickX, clickY)) {
        onBotClick(bot1);
      } else if (bot2.isClicked(clickX, clickY)) {
        onBotClick(bot2);
      }
    });

    bot1.initPosition({ x: 250, y: canvas.clientHeight / 2 });
    bot2.initPosition({ x: canvas.width - 250, y: canvas.clientHeight / 2 });
    const drawScore = () => {
      ctx.font = "30px Arial";
      ctx.fillStyle = "yellow";
      ctx.fillText(`${bot1.score} : ${bot2.score}`, canvas.width / 2, 50);
    };
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bot1.draw(ctx);
      bot2.draw(ctx);
      bot1.move(canvas.height, mouse);
      bot2.move(canvas.height, mouse);
      bot1.shoot(2, bot2);
      bot2.shoot(-2, bot1);
      drawScore();
      requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    gameLoop();

    // Cleanup function
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.removeEventListener("mousemove", (event: MouseEvent) => {
        mouse = { x: event.clientX, y: event.clientY };
      });
      canvas.removeEventListener("click", () => {});
    };
  }, [canvasRef, bot1, bot2, onBotClick]);
};
