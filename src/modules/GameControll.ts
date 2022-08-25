import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControll {
  sanke: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = "";
  isLive = true;

  constructor() {
    this.sanke = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    this.run();
  }

  keyDownHandler(e: KeyboardEvent) {
    this.direction = e.key;
  }

  run() {
    let x = this.sanke.X;
    let y = this.sanke.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
    }

    this.checkEat(x, y);

    try {
      this.sanke.X = x;
      this.sanke.Y = y;
    } catch (error) {
      alert("Game Over!");
      this.isLive = false;
    }

    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.sanke.addBody();
    }
  }
}
export default GameControll;
