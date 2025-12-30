export class HitBoxDebug {
  constructor(gameBoard, data) {
    this.gameBoard = gameBoard;
    this.height = data.height;
    this.width = data.width;
    this.top = data.top;
    this.left = data.left;
    this.el = document.createElement('div');
    this.el.classList.add('game-img', 'hitbox', data.shape.toLowerCase());
    this.el.style.borderColor = data?.color || '#000';
    this.el.style.height = this.height + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.gameBoard.gameRunningArea.appendChild(this.el);
  }
}
