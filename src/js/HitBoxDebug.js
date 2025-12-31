export class HitBoxDebug {
  constructor(gameBoard, sprite) {
    this.gameBoard = gameBoard;
    this.sprite = sprite;
    this.el = document.createElement('div');
    this.el.classList.add(
      'game-img',
      'hitbox',
      this.sprite.hitBox.shape.toLowerCase()
    );
    this.el.style.height = this.sprite.hitBox.height + 'px';
    this.el.style.width = this.sprite.hitBox.width + 'px';
    this.el.style.top = this.sprite.hitBox.top + 'px';
    this.el.style.left = this.sprite.hitBox.left + 'px';
    this.el.style.borderColor = this.sprite.hitBox?.color || '#000';
    this.gameBoard.gameRunningArea.appendChild(this.el);
  }

  updatePositionY() {
    this.el.style.top = this.sprite.hitBox.top + 'px';
  }

  updatePositionX() {
    this.el.style.left = this.sprite.hitBox.left + 'px';
  }

  updatePosition() {
    this.updatePositionY();
    this.updatePositionX();
  }
}
