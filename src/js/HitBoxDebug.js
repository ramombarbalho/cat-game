export class HitBoxDebug {
  constructor(gameBoard, sprite) {
    this.gameBoard = gameBoard;
    this.sprite = sprite;
    this.height = this.sprite.hitBox.height;
    this.width = this.sprite.hitBox.width;
    this.top = this.sprite.hitBox.top;
    this.left = this.sprite.hitBox.left;
    this.el = document.createElement('div');
    this.el.classList.add(
      'game-img',
      'hitbox',
      this.sprite.hitBox.shape.toLowerCase()
    );
    this.el.style.borderColor = this.sprite.hitBox?.color || '#000';
    this.el.style.height = this.height + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
    this.gameBoard.gameRunningArea.appendChild(this.el);
  }
}
