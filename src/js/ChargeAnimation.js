import { Sprite } from './Sprite';

export class ChargeAnimation extends Sprite {
  constructor(gameBoard, player) {
    super(gameBoard);
    this.player = player;
    this.height = this.player.height + this.player.height / 3;
    this.sources = ['__blank.png', 'charge-1.gif', 'charge-2.gif'];
    this.el.style.height = this.height + 'px';
    this.el.src = `${this.sources[this.player.chargeValue]}`;
    this.el.style.display = 'none';
    this.el.style.top = this.player.top - this.player.height * 0.125 + 'px';
    this.el.style.left = this.player.left + this.player.width * 0.31 + 'px';
    this.el.style.zIndex = '3';
    this.gameBoard.gameRunningArea.appendChild(this.el);
  }
}
