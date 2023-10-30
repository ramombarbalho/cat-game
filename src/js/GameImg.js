export class GameImg {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.el = document.createElement('img');
    this.el.classList.add('game-img');
    this.el.setAttribute('draggable', 'false');
  }
}
