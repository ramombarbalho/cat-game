import { Sprite } from './Sprite';

export class ChargeAnimation extends Sprite {
  constructor(gameBoard, player) {
    super(gameBoard, {
      src: 'charge-1-spritesheet.png',
      height: player.height + player.height / 3,
      maxFramesX: 11,
      delayByFrameX: 2
    });

    this.player = player;
    this.el.style.zIndex = '3';

    this.top = this.player.top - this.player.height * 0.125;
    this.left = this.player.left + this.player.width * 0.31;
    this.setInitialPosition();
  }

  updateSrc(value) {
    switch (value) {
      case 1:
        this.el.style.display = 'block';
        return this.setSrc('charge-1-spritesheet.png');
      case 2:
        return this.setSrc('charge-2-spritesheet.png');
      default:
        this.el.style.display = 'none';
        return this.setSrc('__blank.png');
    }
  }

  updatePosition() {
    this.top = this.player.top - this.player.height * 0.125;
    this.left = this.player.left + this.player.width * 0.31;
    this.el.style.top = this.top + 'px';
    this.el.style.left = this.left + 'px';
  }

  // ##fix metodo sem utilização no momento
  update() {
    this.updateCurrentFrameX();
    this.updatePosition();
  }
}
