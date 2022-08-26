import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControll {
  sanke: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = "";
  isLive = true;
  gameoverEle: HTMLElement;
  again: HTMLElement;

  constructor() {
    this.gameoverEle = document.getElementById("game-over")!;
    this.again = document.getElementById("control")!;
    this.sanke = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    this.again.style.display = "none";
    this.gameoverEle.style.display = "none";
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    this.run();
  }

  keyDownHandler(e: KeyboardEvent) {
    e.preventDefault();
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
      this.isLive = false;
      this.again.style.display = "";
      this.gameoverEle.style.display = "";
      this.again.addEventListener("click", this.playAgain, false);
    }

    this.isLive &&
      setTimeout(this.run.bind(this), 200 - (this.scorePanel.level - 1) * 20);
  }

  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.sanke.addBody();
    }
  }

  playAgain() {
    location.reload();
  }
}
export default GameControll;
