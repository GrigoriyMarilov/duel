import { Bot } from "./bots.ts";

export class Spell {
  public id;
  public x;
  public y;
  public speed;
  public enemy;
  public host;

  constructor(
    x: number,
    y: number,
    speed: number,
    enemy: Bot,
    host: Bot,
    id: number,
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.enemy = enemy;
    this.host = host;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x + 5, this.y, 10, 0, Math.PI * 2);
    context.fillStyle = this.host.spellColor;
    context.fill();
    context.closePath();
  }
  public move() {
    const isHitEnemy = () => {
      const withinXBounds =
        this.x >= this.enemy.x - this.enemy.radius &&
        this.x <= this.enemy.x + this.enemy.radius;
      const withinYBounds =
        this.y >= this.enemy.y - this.enemy.radius &&
        this.y <= this.enemy.y + this.enemy.radius;
      return withinXBounds && withinYBounds;
    };
    if (isHitEnemy()) {
      this.host.score++;
      this.host.spells.splice(
        this.host.spells.findIndex((spell) => spell.id === this.id),
        1,
      );
    }

    this.x += this.speed;
  }
}
