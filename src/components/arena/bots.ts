import { Spell } from "./Spell.ts";

interface BotOptions {
  spellColor?: string;
  score?: number;
  APS?: number;
  radius?: number;
  speed?: number;
  x?: number;
  y?: number;
  color?: string;
}

export class Bot implements BotOptions {
  public spellColor = "";
  public score = 0;
  public APS = 1;
  public radius = 100;
  public speed = 0.5;
  public x = 0;
  public y = 0;
  public color = "red";
  public spells: Spell[] = [];
  private isShoot = false;

  constructor(options: BotOptions) {
    Object.assign(this, options);
  }

  public isCollideWithMouse(mouse: { x: number; y: number }) {
    return (
      this.x - this.radius < mouse.x &&
      mouse.x < this.x + this.radius &&
      ((this.y + this.radius < mouse.y &&
        mouse.y < this.y + this.radius + this.speed * 2) ||
        (this.y - this.radius < mouse.y &&
          mouse.y < this.y - this.radius - this.speed * 2))
    );
  }

  public move(height: number, mouse: { x: number; y: number }) {
    if (
      height < this.y + this.radius ||
      0 > this.y - this.radius ||
      this.isCollideWithMouse(mouse)
    ) {
      this.speed = -this.speed;
    }
    this.y += this.speed;

    this.spells.forEach((spell) => {
      spell.move();
    });
  }

  public draw(context: CanvasRenderingContext2D) {
    const drawBot = () => {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    };
    const drawSpells = () => {
      this.spells.forEach((spell) => {
        spell.draw(context);
      });
    };

    drawBot();
    drawSpells();
    return;
  }

  public initPosition(coords: { x: number; y: number }) {
    if (this.x === 0 || this.y === 0) {
      this.x = coords.x;
      this.y = coords.y;
    }
  }

  public shoot(speed: number, enemy: Bot) {
    if (!this.isShoot) {
      this.isShoot = true;
      setTimeout(() => {
        const x = speed > 0 ? this.x + this.radius : this.x - this.radius;
        this.spells.push(
          new Spell(x, this.y, speed, enemy, this, this.spells.length),
        );
        this.isShoot = false;
      }, 1000 / this.APS);
    }
  }

  public setSpeed(value: number) {
    console.log(value, "speed");
    if (this.speed > 0) this.speed = value;
    else {
      this.speed = -value;
    }
  }

  public setAPS(value: number) {
    this.APS = value;
  }

  public isClicked(x: number, y: number) {
    const withinXBounds =
      x >= this.x - this.radius && x <= this.x + this.radius;
    const withinYBounds =
      y >= this.y - this.radius && y <= this.y + this.radius;
    return withinXBounds && withinYBounds;
  }
}
