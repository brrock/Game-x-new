import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.stage);

const gridContainer = new PIXI.Container();
app.stage.addChild(gridContainer);

const cellSize = 200;
const lineStyle = { lineStyle: 5, color: 0x000000 };

const grid = createGrid(3, 3, cellSize);
const horizontalLines = createLines(3, cellSize, lineStyle);
const verticalLines = createLines(3, cellSize, lineStyle, true);

let currentPlayer = 1;
gridContainer.interactive = true;
gridContainer.on("click", handleClick);

function handleClick(event) {
  const { row, col } = getCellCoordinates(event, cellSize);
  if (grid[row][col].alpha !== 1) {
    const circle = createCircle(currentPlayer, cellSize, row, col);
    grid[row][col].alpha = 1;
    gridContainer.addChild(circle);
    const winner = checkWinner(row, col);
    if (winner) {
      endGame(winner);
    } else if (gridContainer.children.length === 12) {
      endGame(0);
    } else {
      currentPlayer = -currentPlayer;
    }
  }
}

function endGame(winner) {
  gridContainer.interactive = false;
  const text = new PIXI.Text(
    winner === 1
      ? "Player 1 wins!"
      : winner === -1
      ? "Player 2 wins!"
      : "It's a tie!",
    { fontFamily: "Arial", fontSize: 50, fill: 0x000000 }
  );
  text.x = app.screen.width / 2 - text.width / 2;
  text.y = app.screen.height / 2 - text.height / 2;
  app.stage.addChild(text);
}

